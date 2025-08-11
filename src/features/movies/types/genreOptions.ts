import { Genre } from "./Genre";

export const GENRE_OPTIONS = Object.values(Genre).map((label) => ({
  label,
  value: label,
}));
