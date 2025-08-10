import { useMutation } from "@tanstack/react-query";
import { useJWTAuthActions } from "src/features/auth/providers/AuthProdiver";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";

export const useSignInForm = () => {
  const { signInUser } = useJWTAuthActions();
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      fetchStart();
      return signInUser(data);
    },
    onSuccess: () => {
      fetchSuccess("Login realizado com sucesso!");
    },
    onError: (error: any) => {
      fetchError(error.response?.data?.message || "Erro ao fazer login");
    },
  });
};
