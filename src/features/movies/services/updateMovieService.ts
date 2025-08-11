import { jwtAxios } from "@core/services/api/axios";
import { EditMovieFormData } from "../components/Forms/EditMovieForm/editMovieFormSchema";
import { IMovie } from "../types";

export interface IUpdateMovieResponse extends IMovie {}

export const updateMovie = async (
  id: string,
  data: EditMovieFormData
): Promise<IUpdateMovieResponse> => {
  const response = await jwtAxios.patch(`/movie/${id}`, data);
  return response.data;
};
