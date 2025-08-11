import * as React from "react";
import { inputVariants } from "./variant";
import clsx from "clsx";

interface BaseProps {
  helperText?: string;
  error?: boolean;
  label?: string;
  id?: string;
  multiline?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
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
      startAdornment,
      endAdornment,
      ...props
    },
    ref
  ) => {
    const extraPadding = !multiline
      ? clsx(endAdornment && "pr-10", startAdornment && "pl-10")
      : undefined;

    const commonProps = {
      id,
      className: clsx(
        inputVariants({ error, disabled }),
        multiline && "min-h-24 max-h-60 overflow-y-auto resize-y",
        extraPadding,
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
          <div className={clsx((startAdornment || endAdornment) && "relative")}>
            {startAdornment && (
              <div className="pointer-events-auto absolute inset-y-0 left-0 flex items-center pl-3">
                {startAdornment}
              </div>
            )}

            <input
              ref={ref as React.Ref<HTMLInputElement>}
              {...commonProps}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />

            {endAdornment && (
              <div className="pointer-events-auto absolute inset-y-0 right-0 flex items-center pr-3">
                {endAdornment}
              </div>
            )}
          </div>
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
export { default as TimeInput } from "./TimeInput";
export { default as CurrencyInput } from "./CurrencyInput";
