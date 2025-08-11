import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditMovieFormData } from "./editMovieFormSchema";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";
import { updateMovie } from "../../../services/updateMovieService";

export const useEditMovieForm = (
  id: string,
  options?: { onSuccess?: () => void }
) => {
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditMovieFormData) => {
      fetchStart();
      return updateMovie(id, data);
    },
    onSuccess: () => {
      fetchSuccess("Filme atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      fetchError(error.response?.data?.message || "Erro ao atualizar filme");
    },
  });
};
