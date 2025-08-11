import * as React from "react";
import { inputVariants } from "./variant";
import clsx from "clsx";

interface BaseProps {
  helperText?: string;
  error?: boolean;
  label?: string;
  id?: string;
  multiline?: boolean;
}

export type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      className,
      label,
      id,
      helperText,
      error = false,
      disabled = false,
      multiline = false,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const commonProps = {
      id,
      className: clsx(
        inputVariants({ error, disabled }),
        multiline && "min-h-24 max-h-60 overflow-y-auto resize-y",
        className
      ),
      disabled,
      "aria-invalid": error as boolean,
    } as const;

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

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...commonProps}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows as number}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...commonProps}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

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

export default Input;
