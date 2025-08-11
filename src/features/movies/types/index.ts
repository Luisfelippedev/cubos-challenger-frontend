import { Genre } from "./Genre";

export interface IMovie {
  id: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  genres: Genre[];
  coverImageUrl?: string;
}

export { Genre } from "./Genre";
