import { type ComponentPropsWithoutRef, type ReactNode } from "react";

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

// BRIEF §3 <Button /> and §5.5. `ghost` (default) is a transparent/outlined
// button whose fill sweeps in from the left on hover/focus (reusing the
// sitewide .sweep-fill mechanism, parameterized to brass instead of ink via
// --sweep-fill-color); `solid` is filled at rest and darkens to --ink on
// hover, same mechanism as the pre-redesign primary button. Renders <a> when
// `href` is given, <button> otherwise — never a clickable div.
const variants: Record<ButtonVariant, string> = {
  ghost: "btn-ghost sweep-fill border border-accent text-ink",
  solid: "sweep-fill bg-accent text-on-accent",
};

export function Button({ variant = "ghost", className = "", children, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
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
