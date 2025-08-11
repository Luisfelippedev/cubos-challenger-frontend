import { jwtAxios } from "@core/services/api/axios";
import { CreateMovieFormData } from "../components/Forms/CreateMovieForm/createMovieFormSchema";
import { IMovie } from "../types";

export interface ICreateMovieResponse extends IMovie {}

export const createMovie = async (
  data: CreateMovieFormData
): Promise<ICreateMovieResponse> => {
  const response = await jwtAxios.post("/movie", data);
  return response.data;
};
