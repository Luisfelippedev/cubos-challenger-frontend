"use client";
import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import jwt from "jsonwebtoken";
import { AuthUserType } from "@core/types/AuthUserType";
import { setAuthToken } from "@core/services/api/axios";
import { authSignInService, authSignUpService } from "../services";

interface JWTAuthContextProps {
  user: AuthUserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => Promise<void>;
  signInUser: (data: SignInProps) => Promise<void>;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: async (data: SignUpProps): Promise<void> => {
    return Promise.reject(new Error("signUpUser not implemented"));
  },
  signInUser: async (data: SignInProps): Promise<void> => {
    return Promise.reject(new Error("signInUser not implemented"));
  },
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);
export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [jwtData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const signInUser = async ({ email, password }: SignInProps) => {
    try {
      const { data } = await authSignInService({ email, password });

      const accessToken = data.access_token.replace("Bearer ", "");

      setAuthToken(accessToken);

      const decodedToken: any = jwt.decode(accessToken);

      setJWTAuthData({
        user: {
          name: decodedToken?.name,
          id: decodedToken?.id,
          email: decodedToken?.email,
        },
        isAuthenticated: true,
        isLoading: false,
      });
      router.push("/movies");
    } catch (error) {
      setJWTAuthData({ ...jwtData, isAuthenticated: false, isLoading: false });
      throw error;
    }
  };

  const signUpUser = async ({
    name,
    email,
    password,
  }: SignUpProps): Promise<void> => {
    try {
      await authSignUpService({ name, email, password });
      router.push("/signin");
    } catch (error) {
      setJWTAuthData({ ...jwtData, isAuthenticated: false, isLoading: false });
      throw error;
    }
  };

  const logout = () => {
    destroyCookie(null, "token");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push("/signin");
  };

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      setAuthToken(token);
      const decodedToken: any = jwt.decode(token);

      setJWTAuthData({
        user: {
          name: decodedToken.name,
          id: decodedToken.id,
          email: decodedToken.email,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setJWTAuthData({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  return (
    <JWTAuthContext.Provider value={{ ...jwtData }}>
      <JWTAuthActionsContext.Provider
        value={{ signUpUser, signInUser, logout }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};

export default JWTAuthProvider;
