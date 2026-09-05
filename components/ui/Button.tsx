import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "ghost" | "solid";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "btn-tap inline-flex items-center justify-center gap-2 rounded-hairline px-[26px] py-[14px] text-label uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";

// Video-reference clone, 2026-09-05. `ghost` (default) mirrors the
// reference's hero CTAs: a white-outlined, transparent button whose fill
// sweeps to accent red on hover/focus (sitewide .sweep-fill mechanism,
// parameterized via --sweep-fill-color); `solid` mirrors the reference's
// "Send Message" CTA — filled white at rest, sweeping to accent red on
// hover. Dark text works unchanged against both white and red (5.9:1 and
// better), so neither variant needs a hover text-color swap. Renders <a>
// when `href` is given, <button> otherwise — never a clickable div.
const variants: Record<ButtonVariant, string> = {
  ghost: "btn-ghost sweep-fill border border-ink/30 text-ink",
  solid: "btn-solid sweep-fill bg-ink text-paper",
};

export function Button({ variant = "ghost", className = "", children, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    // Internal paths need next-intl's <Link> for locale-aware routing
    // (e.g. "/contact" → "/en/contact"); anything else (external URLs,
    // mailto:, tel:, #anchors) is a plain <a>.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
