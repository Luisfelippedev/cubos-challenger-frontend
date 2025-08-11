export interface IMovie {
  id: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  genres: string[];
  coverImageUrl?: string;
}
