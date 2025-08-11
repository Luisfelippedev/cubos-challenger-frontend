"use client";

import * as React from "react";
import clsx from "clsx";
import { inputVariants } from "./variant";
import { formatMinutesAsHHMM, parseHHMMToMinutes } from "@core/utils/time";

interface TimeInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  value: number | null | undefined; // minutos
  onChange: (minutes: number) => void;
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
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
      placeholder = "00:00",
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState<string>(
      formatMinutesAsHHMM(value ?? 0)
    );

    React.useEffect(() => {
      setDisplay(formatMinutesAsHHMM(value ?? 0));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // mantemos apenas dígitos e no máximo 4
      const digits = raw.replace(/\D/g, "").slice(0, 4);
      // monta máscara dinâmica HH:MM
      const masked =
        digits.length <= 2
          ? digits
          : `${digits.slice(0, -2)}:${digits.slice(-2)}`;
      setDisplay(masked);
    };

    const handleBlur = () => {
      const minutes = parseHHMMToMinutes(display);
      onChange(minutes);
      setDisplay(formatMinutesAsHHMM(minutes));
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

TimeInput.displayName = "TimeInput";

export default TimeInput;
