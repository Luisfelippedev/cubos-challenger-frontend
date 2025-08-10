"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import { useCreateMovieForm } from "./useCreateMovieForm";
import {
  CreateMovieFormData,
  createMovieSchema,
} from "./createMovieFormSchema";

export interface CreateMovieFormHandles {
  submitForm: () => void;
}

export const CreateMovieForm = forwardRef<CreateMovieFormHandles>((_, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMovieFormData>({
    resolver: zodResolver(createMovieSchema),
  });

  const mutation = useCreateMovieForm();

  const onSubmit = (data: CreateMovieFormData) => {
    mutation.mutate(data);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form className="space-y-4" noValidate>
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

      <Input
        id="genres"
        label="Gêneros (separados por vírgula)"
        placeholder="Ação, Drama"
        {...register("genres", {
          setValueAs: (v: string) =>
            v
              .split(",")
              .map((g) => g.trim())
              .filter((g) => g.length > 0),
        })}
        error={!!errors.genres}
        helperText={errors.genres?.message}
      />
    </form>
  );
});
