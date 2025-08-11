"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { FetchProvider } from "./FetchProvider";
import JWTAuthProvider from "src/features/auth/providers/AuthProdiver";
import { useState } from "react";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <FetchProvider>
        <JWTAuthProvider>
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </JWTAuthProvider>
      </FetchProvider>
    </QueryClientProvider>
  );
};

export default ClientProviders;
