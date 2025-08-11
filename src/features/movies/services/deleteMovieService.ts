import { jwtAxios } from "@core/services/api/axios";

export const deleteMovie = async (id: string): Promise<void> => {
  await jwtAxios.delete(`/movie/${id}`);
};
