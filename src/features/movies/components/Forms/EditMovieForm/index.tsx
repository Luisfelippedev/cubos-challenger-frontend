"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import { EditMovieFormData, editMovieSchema } from "./editMovieFormSchema";
import { useEditMovieForm } from "./useEditMovieForm";
import { IMovie } from "../../../types";
import { formatDateForDateInput } from "@core/utils/date";

export interface EditMovieFormHandles {
  submitForm: () => void;
}

interface EditMovieFormProps {
  movie: IMovie;
  onSuccess?: () => void;
  formId?: string;
}

export const EditMovieForm = forwardRef<
  EditMovieFormHandles,
  EditMovieFormProps
>(({ movie, onSuccess, formId }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<EditMovieFormData>({
    resolver: zodResolver(editMovieSchema),
    defaultValues: {
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      releaseDate: formatDateForDateInput(movie.releaseDate),
      genres: movie.genres,
    },
  });

  useEffect(() => {
    reset({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      releaseDate: formatDateForDateInput(movie.releaseDate),
      genres: movie.genres,
    });
  }, [movie, reset]);

  const mutation = useEditMovieForm(movie.id, { onSuccess });

  const onSubmit = (data: EditMovieFormData) => {
    mutation.mutate(data);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form
      id={formId}
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="title"
        label="Título"
        placeholder="O Senhor dos Anéis: A Sociedade do Anel"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <Input
        id="description"
        label="Descrição"
        placeholder="Um hobbit é incumbido de destruir um anel poderoso antes que ele caia em mãos erradas."
        multiline
        rows={5}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <Input
        id="duration"
        label="Duração (minutos)"
        type="number"
        {...register("duration", { valueAsNumber: true })}
        error={!!errors.duration}
        helperText={errors.duration?.message}
      />

      <Input
        id="releaseDate"
        label="Data de Lançamento"
        type="date"
        {...register("releaseDate")}
        error={!!errors.releaseDate}
        helperText={errors.releaseDate?.message}
      />

      <Controller
        name="genres"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            id="genres"
            label="Gêneros (separados por vírgula)"
            placeholder="Ação, Drama"
            value={Array.isArray(value) ? value.join(", ") : ""}
            onChange={(e) =>
              onChange(
                String(e.target.value || "")
                  .split(",")
                  .map((g) => g.trim())
                  .filter((g) => g.length > 0)
              )
            }
            error={!!errors.genres}
            helperText={errors.genres?.message}
          />
        )}
      />
    </form>
  );
});
