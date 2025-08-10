"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { FetchProvider } from "./FetchProvider";
import JWTAuthProvider from "src/features/auth/providers/AuthProdiver";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
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
