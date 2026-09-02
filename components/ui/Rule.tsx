type RuleProps = {
  className?: string;
  /** BRIEF §3 <Divider /> — a 40px --accent segment leads the hairline
   *  instead of a plain rule, used as a section separator. */
  accent?: boolean;
};

export function Rule({ className = "", accent = false }: RuleProps) {
  if (accent) {
    return (
      <div role="separator" className={`flex items-center ${className}`}>
        <div className="h-px w-10 bg-accent" />
        <div className="h-px flex-1 bg-rule" />
      </div>
    );
  }

  return <hr className={`border-0 border-t border-rule ${className}`} />;
}
