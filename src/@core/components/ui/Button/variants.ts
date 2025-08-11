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
        icon: "p-2 rounded-full bg-black bg-opacity-50 hover:bg-gray-700 text-white focus-visible:ring-white",
        link: "bg-transparent p-0 text-indigo-600 dark:text-indigo-400 hover:underline focus-visible:ring-indigo-500 rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      size: {
        small: "text-sm gap-1 rounded-sm px-3 py-1.5",
        medium: "text-base gap-2 rounded-md px-4 py-2",
        large: "text-lg gap-3 rounded-lg px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
      size: "medium",
    },
  }
);
