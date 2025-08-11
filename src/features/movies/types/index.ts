import { Genre } from "./Genre";

export interface IMovie {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  duration: number;
  releaseDate: string;
  genres: Genre[];
  coverImageUrl?: string;
  productionBudget: number;
}

export { Genre } from "./Genre";
