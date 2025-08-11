"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import MultiSelect from "@core/components/ui/MultiSelect";
import { GENRE_OPTIONS } from "src/features/movies/types/genreOptions";
import TimeInput from "@core/components/ui/Input/TimeInput";
import UploadImage from "@core/components/ui/UploadImage";
import { uploadMovieCover } from "src/features/movies/services/uploadCoverService";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";
import { useQueryClient } from "@tanstack/react-query";
import { createMovie } from "src/features/movies/services/createMovieService";
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

  const queryClient = useQueryClient();
  const [localCoverUrl, setLocalCoverUrl] = useState<string | undefined>();
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();

  useEffect(() => {
    return () => {
      if (localCoverUrl?.startsWith("blob:"))
        URL.revokeObjectURL(localCoverUrl);
    };
  }, [localCoverUrl]);

  const onSubmit = async (data: CreateMovieFormData) => {
    fetchStart();
    try {
      let coverUrl: string | undefined = undefined;
      if (selectedCoverFile) {
        const result = await uploadMovieCover(selectedCoverFile);
        coverUrl = result.url;
      }
      const payload = { ...data, coverImageUrl: coverUrl };
      await createMovie(payload);
      fetchSuccess("Filme criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      onSuccess?.();
    } catch (error: any) {
      fetchError(error?.response?.data?.message || "Erro ao criar filme");
    }
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

      <UploadImage
        value={localCoverUrl}
        onChange={(url) => {
          // Remoção
          if (!url) {
            if (localCoverUrl?.startsWith("blob:"))
              URL.revokeObjectURL(localCoverUrl);
            setLocalCoverUrl(undefined);
            setSelectedCoverFile(null);
          }
        }}
        onSelect={(file) => {
          if (localCoverUrl?.startsWith("blob:"))
            URL.revokeObjectURL(localCoverUrl);
          setSelectedCoverFile(file);
          const preview = URL.createObjectURL(file);
          setLocalCoverUrl(preview);
        }}
      />
    </form>
  );
});
