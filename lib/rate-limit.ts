// Simple in-memory, fixed-window rate limiter — intentionally minimal for V1
// (PRD §9.1 calls for "IP rate limit" without specifying infrastructure, and
// this repo has no database/Redis).
//
// KNOWN LIMITATION: the `buckets` map lives in the memory of a single Node.js
// process. On Vercel (or any multi-instance/serverless host) each instance —
// and every cold start — gets its own empty map, so a client can bypass the
// limit simply by hitting a different instance, and any restart resets every
// counter to zero. This is an accepted V1 trade-off, not an oversight: it
// still stops naive single-instance abuse/scripts without adding an external
// dependency (Upstash/Redis) for a low-traffic contact form. Revisit only if
// abuse is actually observed in production.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

type Bucket = {
  count: number;
  windowStart: number;
};

const buckets = new Map<string, Bucket>();

/** Drops expired buckets so the map doesn't grow forever between restarts. */
function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > WINDOW_MS) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfterMs: number;
} {
  const now = Date.now();

  if (buckets.size > 1000) {
    prune(now);
  }

  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - bucket.windowStart) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}
