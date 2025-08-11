// variants.ts
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white focus-visible:ring-indigo-500 rounded-md px-4 py-2",
        secondary:
          "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 focus-visible:ring-gray-400 rounded-md px-4 py-2",
        icon: `
          inline-flex items-center justify-center
          rounded-md border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition-colors
        `,
        link: "bg-transparent p-0 text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:ring-indigo-500 rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      size: {
        small: "h-8 text-sm",
        medium: "h-10 text-base",
        large: "h-11 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
      size: "medium",
    },
    compoundVariants: [
      { variant: "icon", size: "small", class: "h-8 w-8" },
      { variant: "icon", size: "medium", class: "h-10 w-10" },
      { variant: "icon", size: "large", class: "h-11 w-11" },
    ],
  }
);
