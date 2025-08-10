import { useMutation } from "@tanstack/react-query";
import { CreateMovieFormData } from "./createMovieFormSchema";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";
import { createMovie } from "src/features/movies/services/movieService";

export const useCreateMovieForm = () => {
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();

  return useMutation({
    mutationFn: async (data: CreateMovieFormData) => {
      fetchStart();
      return createMovie(data);
    },
    onSuccess: () => {
      fetchSuccess("Filme criado com sucesso!");
    },
    onError: (error: any) => {
      fetchError(error.response?.data?.message || "Erro ao criar filme");
    },
  });
};
