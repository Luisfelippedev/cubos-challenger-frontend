import * as React from "react";
import clsx from "clsx";
import { buttonVariants } from "./variants";
import type { VariantProps } from "class-variance-authority";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      fullWidth,
      size = "medium",
      startIcon,
      endIcon,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e);
      e.currentTarget.blur();
    };

    return (
      <button
        ref={ref}
        className={clsx(
          buttonVariants({ variant, fullWidth, size }),
          className,
          "active:scale-95 active:opacity-80"
        )}
        {...props}
        onClick={handleClick}
      >
        {startIcon && (
          <span className="inline-flex items-center mr-2">{startIcon}</span>
        )}

        {children}

        {endIcon && (
          <span className="inline-flex items-center ml-2">{endIcon}</span>
        )}
      </button>
    );
  }
);

export default Button;
