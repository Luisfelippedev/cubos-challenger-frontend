import { IMovie } from "../../types";

export interface ListMovieParams {
  genre?: string;
  releaseDateEnd?: string;
  releaseDateStart?: string;
  durationMax?: number;
  durationMin?: number;
  search?: string;
  perPage?: number;
  page?: number;
}

export interface ListMovieResponse {
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  data: IMovie[];
}
