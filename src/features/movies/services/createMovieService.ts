import { jwtAxios } from "@core/services/api/axios";
import { CreateMovieFormData } from "../components/Forms/CreateMovieForm/createMovieFormSchema";
import { IMovie } from "../types";
import { toDecimalString } from "@core/utils/decimal";

export interface ICreateMovieResponse extends IMovie {}

export const createMovie = async (
  data: CreateMovieFormData
): Promise<ICreateMovieResponse> => {
  const payload = {
    ...data,
    productionBudget: toDecimalString(data.productionBudget),
  } as const;
  const response = await jwtAxios.post("/movie", payload);
  return response.data;
};
