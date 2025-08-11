import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";
import { deleteMovie } from "../../../services";

export const useDeleteMovie = (options?: { onSuccess?: () => void }) => {
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      fetchStart();
      await deleteMovie(id);
    },
    onSuccess: () => {
      fetchSuccess("Filme removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      fetchError(error?.response?.data?.message || "Erro ao remover filme");
    },
  });
};
