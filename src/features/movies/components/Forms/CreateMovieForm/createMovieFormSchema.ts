import * as z from "zod";
import { Genre } from "src/features/movies/types";

export const createMovieSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  duration: z
    .number({ error: "Duração deve ser um número" })
    .int("Duração deve ser um número inteiro")
    .positive("Duração deve ser positiva"),
  releaseDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Data de lançamento inválida"),
  genres: z.array(z.nativeEnum(Genre)).min(1, "Selecione pelo menos um gênero"),
});

export type CreateMovieFormData = z.infer<typeof createMovieSchema>;
