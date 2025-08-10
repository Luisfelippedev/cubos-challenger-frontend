import { jwtAxios } from "@core/services/api/axios";
import { CreateMovieFormData } from "../components/Forms/CreateMovieForm/createMovieFormSchema";


export interface MovieResponse {
  id: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  genres: string[];
}

export const createMovie = async (
  data: CreateMovieFormData
): Promise<MovieResponse> => {
  const response = await jwtAxios.post("/movie", data);
  return response.data;
};
