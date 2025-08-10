import { jwtAxios } from "@core/services/api/axios";

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const signIn = async (data: SignInProps): Promise<any> => {
  return jwtAxios.post("auth", data);
};

export const signUp = async (data: SignUpProps) => {
  return jwtAxios.post("user", data);
};
