import { forwardRef, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  as?: React.ElementType;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
  (
    { onClick, href, children, as = "button", disabled = false }: ButtonProps,
    ref
  ) => {
    const Element = as;
    return (
      <Element
        href={href}
        onClick={disabled ? () => {} : onClick}
        ref={ref}
        className={clsx(
          "block rounded-full bg-now-darkest py-3 px-6 text-xl text-white",
          {
            "opacity-30": disabled,
          }
        )}
        disabled={disabled}
      >
        {children}
      </Element>
    );
  }
);

export const InlineButton = forwardRef(
  (
    {
      onClick,
      href,
      children,
      as = "button",
      disabled = false,
      className,
    }: ButtonProps,
    ref
  ) => {
    const Element = as;
    return (
      <Element
        href={href}
        onClick={disabled ? () => {} : onClick}
        ref={ref}
        className={clsx("block text-xl text-now-darkorange", className, {
          "opacity-30": disabled,
        })}
      >
        {children}
      </Element>
    );
  }
);

Button.displayName = "Button";
InlineButton.displayName = "InlineButton";
