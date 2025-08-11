"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { X, ChevronDown } from "lucide-react";
import { inputVariants } from "@core/components/ui/Input/variant";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: MultiSelectOption[];
  value: string[] | undefined;
  onChange: (values: string[]) => void;
  className?: string;
  usePortal?: boolean;
  dropdownZIndex?: number;
}

const MultiSelect = ({
  id,
  label,
  helperText,
  error = false,
  disabled = false,
  placeholder = "Selecione...",
  options,
  value,
  onChange,
  className,
  usePortal = true,
  dropdownZIndex = 60,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const selectedValues = value ?? [];

  const filteredOptions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        opt.value.toLowerCase().includes(term)
    );
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideTrigger = containerRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideTrigger && !insideDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen || !usePortal) return;
    const updatePosition = () => {
      const trigger = containerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const top = rect.bottom + 4; // small gap
      const left = rect.left;
      const width = rect.width;
      const maxHeight = Math.max(160, window.innerHeight - top - 16);
      setDropdownStyle({
        position: "fixed",
        top,
        left,
        width,
        maxHeight,
        zIndex: dropdownZIndex,
      });
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, usePortal, dropdownZIndex]);

  const toggleValue = (val: string) => {
    if (disabled) return;
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((v) => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const removeValue = (val: string) => {
    if (disabled) return;
    onChange(selectedValues.filter((v) => v !== val));
  };

  return (
    <div className="space-y-1" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm text-gray-600 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div
        id={id}
        className={clsx(
          inputVariants({ error, disabled }),
          "min-h-10 flex items-center flex-wrap gap-1 py-1 pr-8 cursor-text relative",
          className
        )}
        aria-invalid={error}
        aria-disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedValues.length === 0 && (
          <span className="text-gray-400 dark:text-gray-500 px-1">
            {placeholder}
          </span>
        )}

        {selectedValues.map((val) => {
          const option = options.find((o) => o.value === val);
          const labelToShow = option?.label ?? val;
          return (
            <span
              key={val}
              className="flex items-center gap-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 px-2 py-0.5 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {labelToShow}
              <button
                type="button"
                className="p-0.5 hover:opacity-80"
                onClick={() => removeValue(val)}
                aria-label={`Remover ${labelToShow}`}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          );
        })}

        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
          aria-hidden
        />
      </div>

      {isOpen &&
        !disabled &&
        (usePortal ? (
          createPortal(
            <div
              ref={dropdownRef}
              style={dropdownStyle}
              className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-auto"
              role="presentation"
            >
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className={clsx(
                    inputVariants({ error: false, disabled: false }),
                    "h-8 text-sm"
                  )}
                />
              </div>
              <ul
                className="overflow-auto py-1"
                role="listbox"
                aria-multiselectable
              >
                {filteredOptions.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 select-none">
                    Nenhum resultado
                  </li>
                )}
                {filteredOptions.map((opt) => {
                  const checked = selectedValues.includes(opt.value);
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={checked}
                      className={clsx(
                        "px-3 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                        checked && "bg-indigo-50 dark:bg-indigo-900/30"
                      )}
                      onClick={() => toggleValue(opt.value)}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleValue(opt.value)}
                        className="h-4 w-4"
                      />
                      <span>{opt.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>,
            document.body
          )
        ) : (
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <div
              ref={dropdownRef}
              className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
            >
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className={clsx(
                    inputVariants({ error: false, disabled: false }),
                    "h-8 text-sm"
                  )}
                />
              </div>
              <ul
                className="max-h-56 overflow-auto py-1"
                role="listbox"
                aria-multiselectable
              >
                {filteredOptions.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 select-none">
                    Nenhum resultado
                  </li>
                )}
                {filteredOptions.map((opt) => {
                  const checked = selectedValues.includes(opt.value);
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={checked}
                      className={clsx(
                        "px-3 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                        checked && "bg-indigo-50 dark:bg-indigo-900/30"
                      )}
                      onClick={() => toggleValue(opt.value)}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleValue(opt.value)}
                        className="h-4 w-4"
                      />
                      <span>{opt.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}

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
};

export default MultiSelect;
