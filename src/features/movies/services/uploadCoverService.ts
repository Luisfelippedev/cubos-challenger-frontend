import { jwtAxios } from "@core/services/api/axios";

export interface UploadCoverResponse {
  key: string;
  url: string;
}

export const uploadMovieCover = async (
  file: File
): Promise<UploadCoverResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await jwtAxios.post("/movie/cover", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data as UploadCoverResponse;
};
