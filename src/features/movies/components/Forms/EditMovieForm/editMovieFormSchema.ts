import * as z from "zod";
import { createMovieSchema } from "../CreateMovieForm/createMovieFormSchema";

export const editMovieSchema = createMovieSchema;
export type EditMovieFormData = z.infer<typeof editMovieSchema>;
