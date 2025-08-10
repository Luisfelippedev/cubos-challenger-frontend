"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

// Contexto interno para fechar o modal de dentro
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

// Root
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
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Container */}
        <div className="relative z-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg mx-4 overflow-hidden animate-fadeIn">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

// Title
const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  );
};

// Close Button
const CloseButton = () => {
  const { onClose } = useModalContext();
  return (
    <button
      onClick={onClose}
      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      aria-label="Fechar modal"
    >
      <X size={20} />
    </button>
  );
};

// Content
const Content = ({ children }: { children: ReactNode }) => {
  return <div className="p-6">{children}</div>;
};

// Actions
const Actions = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800">
      {children}
    </div>
  );
};

// Action Button
interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "confirm" | "cancel";
}

const Action = ({ variant = "confirm", children, ...props }: ActionProps) => {
  const { onClose } = useModalContext();

  const baseClasses =
    "px-4 py-2 rounded-md font-medium text-sm transition focus:outline-none";
  const variants = {
    confirm:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    cancel:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
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
};
