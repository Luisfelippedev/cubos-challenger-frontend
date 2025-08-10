import * as React from "react";
import { inputVariants } from "./variant";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
  label?: string;
  id?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      id,
      helperText,
      error = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm text-gray-600 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={clsx(inputVariants({ error, disabled }), className)}
          disabled={disabled}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <p
            className={clsx(
              "text-xs",
              error
                ? "text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
