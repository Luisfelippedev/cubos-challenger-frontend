"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalContextType {
  onClose: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("Modal compound component must be used inside Modal.Root");
  return ctx;
}

interface RootProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Root = ({ open, onClose, children }: RootProps) => {
  if (!open) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg mx-4 overflow-hidden animate-fadeIn">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  );
};

const CloseButton = () => {
  const { onClose } = useModalContext();
  return (
    <button
      onClick={onClose}
      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
      aria-label="Fechar modal"
    >
      <X size={20} />
    </button>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return <div className="p-6">{children}</div>;
};

const Description = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>;
};

const Actions = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800">
      {children}
    </div>
  );
};

interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "confirm" | "cancel" | "danger";
}

const Action = ({ variant = "confirm", children, ...props }: ActionProps) => {
  const { onClose } = useModalContext();

  const baseClasses =
    "px-4 py-2 rounded-md font-medium text-sm transition focus:outline-none inline-flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<NonNullable<ActionProps["variant"]>, string> = {
    confirm:
      "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white focus-visible:ring-indigo-500",
    cancel:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "cancel") {
      onClose();
    }
    props.onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={clsx(baseClasses, variants[variant])}
    >
      {children}
    </button>
  );
};

export const Modal = {
  Root,
  Title,
  CloseButton,
  Content,
  Actions,
  Action,
  Description,
};
