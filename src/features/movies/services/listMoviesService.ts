import { jwtAxios } from "@core/services/api/axios";
import { ListMovieParams, ListMovieResponse } from "../components/List/types";

export const listMovies = async (
  params: ListMovieParams
): Promise<ListMovieResponse> => {
  const response = await jwtAxios.get<ListMovieResponse>("/movie", {
    params,
  });
  return response.data;
};
