import { jwtAxios } from "@core/services/api/axios";
import { EditMovieFormData } from "../components/Forms/EditMovieForm/editMovieFormSchema";
import { IMovie } from "../types";
import { toDecimalString } from "@core/utils/decimal";

export interface IUpdateMovieResponse extends IMovie {}

export const updateMovie = async (
  id: string,
  data: EditMovieFormData
): Promise<IUpdateMovieResponse> => {
  const payload = {
    ...data,
    productionBudget: toDecimalString(data.productionBudget),
  } as const;
  const response = await jwtAxios.patch(`/movie/${id}`, payload);
  return response.data;
};
