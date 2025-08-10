"use client";

import { createContext, ReactNode } from "react";
import Loader from "@core/components/ui/Loader";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface FetchContextType {
  fetchStart: () => void;
  fetchSuccess: (message: string) => void;
  fetchError: (message: string) => void;
}

export const FetchContext = createContext<FetchContextType | undefined>(
  undefined
);

export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const fetchStart = () => setLoading(true);

  const fetchSuccess = (message: string) => {
    setLoading(false);
    toast.success(message, { duration: 3000 });
  };

  const fetchError = (message: string) => {
    setLoading(false);
    toast.error(message, { duration: 3000 });
  };

  return (
    <FetchContext.Provider value={{ fetchStart, fetchSuccess, fetchError }}>
      {children}
      {loading && <Loader fullscreen />}
      <Toaster position="bottom-right" />
    </FetchContext.Provider>
  );
};
