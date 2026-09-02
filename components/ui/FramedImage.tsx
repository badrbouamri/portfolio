import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  /** CSS aspect-ratio value, e.g. "16/9", "4/3". Defaults to 16/9. */
  ratio?: string;
  sizes?: string;
  className?: string;
};

// BRIEF §3 <FramedImage />. The frame is a second, offset rectangle peeking
// out bottom-right — a flat 1px hairline, not a drop shadow, echoing the
// same "drafted, not sculpted" language as the rest of the shape system.
// Decorative, so it's aria-hidden; the image itself carries the real alt text.
export function FramedImage({
  src,
  alt,
  caption,
  priority = false,
  ratio = "16/9",
  sizes = "(min-width: 1024px) 800px, 100vw",
  className = "",
}: FramedImageProps) {
  return (
    <figure className={className}>
      <div className="relative mr-3 mb-3">
        <div
          aria-hidden
          className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-hairline border border-rule"
        />
        <div className="relative overflow-hidden rounded-hairline border border-rule" style={{ aspectRatio: ratio }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      </div>
      {caption ? <figcaption className="text-caption text-left text-steel">{caption}</figcaption> : null}
    </figure>
  );
}
