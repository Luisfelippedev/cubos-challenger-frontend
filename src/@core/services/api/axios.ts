import { setCookie, destroyCookie, parseCookies } from "nookies";
import axios from "axios";
import jwt from "jsonwebtoken";

export const jwtAxios = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

jwtAxios.interceptors.request.use((config) => {
  const { token } = parseCookies();
  if (token && !config.headers?.Authorization) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

jwtAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // logout();
      // window.location.href = "/signin";

      // destroyCookie(null, "token");
      // delete jwtAxios.defaults.headers.common.Authorization;

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (accessToken?: string) => {
  if (accessToken) {
    const decodedAccess: any = jwt.decode(accessToken);
    let maxAgeAccess = 60 * 60 * 24 * 7;

    if (decodedAccess?.exp && decodedAccess?.iat) {
      maxAgeAccess = decodedAccess.exp - decodedAccess.iat;
    }

    setCookie(null, "token", accessToken, { path: "/", maxAge: maxAgeAccess });
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    destroyCookie(null, "token");
    delete jwtAxios.defaults.headers.common.Authorization;
  }
};
