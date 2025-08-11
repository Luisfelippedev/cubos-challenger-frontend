import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMovieFormData } from "./createMovieFormSchema";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";
import { createMovie } from "src/features/movies/services/createMovieService";

export const useCreateMovieForm = (options?: { onSuccess?: () => void }) => {
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMovieFormData) => {
      fetchStart();
      return createMovie(data);
    },
    onSuccess: () => {
      fetchSuccess("Filme criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      fetchError(error.response?.data?.message || "Erro ao criar filme");
    },
  });
};
