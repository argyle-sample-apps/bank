import clsx from "clsx";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Megatitle({ children, className }: TypographyProps) {
  return (
    <h1 className={clsx("text-6xl font-light text-now-darkest", className)}>
      {children}
    </h1>
  );
}

export function Title({ children, className }: TypographyProps) {
  return (
    <h1 className={clsx("text-title font-light text-now-darkest", className)}>
      {children}
    </h1>
  );
}

export function Heading({ children, className }: TypographyProps) {
  return (
    <h2 className={clsx("text-heading font-light text-now-darkest", className)}>
      {children}
    </h2>
  );
}

export function Subheading({ children, className }: TypographyProps) {
  return (
    <h3
      className={clsx(
        "text-subheading font-normal text-now-darkest",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p className={clsx("text-base font-normal text-now-grey40", className)}>
      {children}
    </p>
  );
}

export function Subparagraph({ children, className }: TypographyProps) {
  return (
    <p className={clsx("text-sm font-normal text-black", className)}>
      {children}
    </p>
  );
}

export function Footnote({ children, className }: TypographyProps) {
  return (
    <h4 className={clsx("text-xs font-normal text-gray-400", className)}>
      {children}
    </h4>
  );
}

export function Strong({ children, className }: TypographyProps) {
  return (
    <span className={clsx("font-normal text-black", className)}>
      {children}
    </span>
  );
}
