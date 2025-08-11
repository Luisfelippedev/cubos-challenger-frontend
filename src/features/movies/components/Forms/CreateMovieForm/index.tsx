"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import MultiSelect from "@core/components/ui/MultiSelect";
import { GENRE_OPTIONS } from "src/features/movies/types/genreOptions";
import TimeInput from "@core/components/ui/Input/TimeInput";
import { useCreateMovieForm } from "./useCreateMovieForm";
import {
  CreateMovieFormData,
  createMovieSchema,
} from "./createMovieFormSchema";

export interface CreateMovieFormHandles {
  submitForm: () => void;
}

interface CreateMovieFormProps {
  onSuccess?: () => void;
}

export const CreateMovieForm = forwardRef<
  CreateMovieFormHandles,
  CreateMovieFormProps
>(({ onSuccess }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateMovieFormData>({
    resolver: zodResolver(createMovieSchema),
  });

  const mutation = useCreateMovieForm({ onSuccess });

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
        multiline
        rows={5}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <Controller
        name="duration"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TimeInput
            id="duration"
            label="Duração (HH:MM)"
            value={typeof value === "number" ? value : 0}
            onChange={onChange}
            error={!!errors.duration}
            helperText={errors.duration?.message}
          />
        )}
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
          <MultiSelect
            id="genres"
            label="Gêneros"
            placeholder="Selecione os gêneros"
            options={GENRE_OPTIONS}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            helperText={errors.genres?.message}
            error={!!errors.genres}
          />
        )}
      />
    </form>
  );
});
