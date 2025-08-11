import { useQuery } from "@tanstack/react-query";
import { ListMovieResponse } from "../types";
import { listMovies } from "../../../services/listMoviesService";
import { useJWTAuth } from "src/features/auth/providers/AuthProdiver";

export const useListMovies = () => {
  const { isAuthenticated, isLoading } = useJWTAuth();

  return useQuery<ListMovieResponse, Error>({
    queryKey: ["movies", { page: 1, perPage: 10 }],
    queryFn: () => listMovies({ page: 1, perPage: 10 }),
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated && !isLoading,
    retry: (failureCount, error) => {
      if ((error as any)?.response?.status === 401) return false;
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
  });
};
