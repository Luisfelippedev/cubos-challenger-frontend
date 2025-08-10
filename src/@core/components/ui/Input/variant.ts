import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full rounded-md border px-3 py-2 outline-none ring-0 transition-colors bg-white dark:bg-gray-800",
  {
    variants: {
      error: {
        true: "border-red-500 dark:border-red-400",
        false:
          "border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:dark:border-indigo-400",
      },
      disabled: {
        true: "bg-gray-100 dark:bg-gray-700 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  }
);
