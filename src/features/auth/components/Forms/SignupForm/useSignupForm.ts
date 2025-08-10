import { useMutation } from "@tanstack/react-query";
import { useJWTAuthActions } from "src/features/auth/providers/AuthProdiver";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export function useSignUpForm() {
  const { signUpUser } = useJWTAuthActions();
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();

  return useMutation({
    mutationFn: async (data: SignUpData) => {
      fetchStart();
      return signUpUser(data);
    },
    onSuccess: () => {
      fetchSuccess("Cadastro realizado com sucesso! Faça login!");
    },
    onError: (error: any) => {
      fetchError(error.response?.data?.message || "Erro ao cadastrar");
    },
  });
}
