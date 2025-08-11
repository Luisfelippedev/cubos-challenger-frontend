"use client";

import * as React from "react";
import clsx from "clsx";
import { inputVariants } from "@core/components/ui/Input/variant";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  options: SelectOption[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      helperText,
      error = false,
      disabled = false,
      options,
      value,
      onChange,
      className,
      placeholder = "Selecione...",
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

        <select
          ref={ref}
          id={id}
          className={clsx(inputVariants({ error, disabled }), className)}
          disabled={disabled}
          aria-invalid={error}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

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

export default Select;
