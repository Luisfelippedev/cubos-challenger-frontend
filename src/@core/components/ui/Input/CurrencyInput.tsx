"use client";

import * as React from "react";
import clsx from "clsx";
import { inputVariants } from "./variant";
import { formatCurrencyBRL } from "../../../utils/currency";

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  value: number | null | undefined;
  onChange: (value: number) => void;
}

export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(
  (
    {
      id,
      label,
      helperText,
      error = false,
      disabled = false,
      className,
      value,
      onChange,
      placeholder = "R$ 0,00",
      ...props
    },
    ref
  ) => {
    const formatDisplay = (amount: number | null | undefined) => {
      const safe =
        typeof amount === "number" && !Number.isNaN(amount) ? amount : 0;
      return formatCurrencyBRL(safe);
    };

    const [display, setDisplay] = React.useState<string>(formatDisplay(value));

    React.useEffect(() => {
      setDisplay(formatDisplay(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const digits = raw.replace(/\D/g, "");
      const limited = digits.slice(0, 15);
      const cents = Number(limited || "0");
      const amount = cents / 100;
      setDisplay(formatCurrencyBRL(amount));
      onChange(amount);
    };

    const handleBlur = () => {
      const digits = display.replace(/\D/g, "");
      const cents = Number(digits || "0");
      const amount = cents / 100;
      onChange(amount);
      setDisplay(formatCurrencyBRL(amount));
    };

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
          ref={ref}
          id={id}
          inputMode="numeric"
          autoComplete="off"
          placeholder={placeholder}
          className={clsx(inputVariants({ error, disabled }), className)}
          disabled={disabled}
          value={display}
          onChange={handleChange}
          onBlur={handleBlur}
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

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
