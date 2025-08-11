import { useQuery } from "@tanstack/react-query";
import { ListMovieParams, ListMovieResponse } from "../types";
import { listMovies } from "../../../services/listMoviesService";
import { useJWTAuth } from "src/features/auth/providers/AuthProdiver";

export const useListMovies = (params: ListMovieParams) => {
  const { isAuthenticated, isLoading } = useJWTAuth();

  return useQuery<ListMovieResponse, Error>({
    queryKey: ["movies", params],
    queryFn: () => listMovies(params),
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated && !isLoading,
    retry: (failureCount, error) => {
      if ((error as any)?.response?.status === 401) return false;
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
  });
};
