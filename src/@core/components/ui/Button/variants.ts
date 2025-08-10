import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white focus:ring-indigo-500",
        secondary:
          "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-gray-400",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      size: {
        small: "text-sm px-3 py-1.5 gap-1 rounded-sm",
        medium: "text-base px-4 py-2 gap-2 rounded-md",
        large: "text-lg px-6 py-3 gap-3 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
      size: "medium",
    },
  }
);
