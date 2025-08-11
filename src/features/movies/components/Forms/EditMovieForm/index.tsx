"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@core/components/ui/Input";
import MultiSelect from "@core/components/ui/MultiSelect";
import { GENRE_OPTIONS } from "src/features/movies/types/genreOptions";
import TimeInput from "@core/components/ui/Input/TimeInput";
import { EditMovieFormData, editMovieSchema } from "./editMovieFormSchema";
import { useEditMovieForm } from "./useEditMovieForm";
import { IMovie } from "../../../types";
import { formatDateForDateInput } from "@core/utils/date";
import { uploadMovieCover } from "src/features/movies/services/uploadCoverService";
import { useFetchFeedback } from "@core/hooks/useFetchFeedback";
import UploadImage from "@core/components/ui/UploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "../../../services/updateMovieService";
import CurrencyInput from "@core/components/ui/Input/CurrencyInput";
import { decimalLikeToNumber } from "@core/utils/decimal";

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
    resolver: zodResolver(editMovieSchema) as Resolver<EditMovieFormData>,
    defaultValues: {
      title: movie.title,
      originalTitle: movie.originalTitle,
      description: movie.description,
      duration: movie.duration,
      releaseDate: formatDateForDateInput(movie.releaseDate),
      genres: movie.genres,
      productionBudget: decimalLikeToNumber((movie as any).productionBudget),
    },
  });

  useEffect(() => {
    reset({
      title: movie.title,
      originalTitle: movie.originalTitle,
      description: movie.description,
      duration: movie.duration,
      releaseDate: formatDateForDateInput(movie.releaseDate),
      genres: movie.genres,
      productionBudget: decimalLikeToNumber((movie as any).productionBudget),
    });
  }, [movie, reset]);

  const queryClient = useQueryClient();
  const [localCoverUrl, setLocalCoverUrl] = useState<string | undefined>(
    movie.coverImageUrl
  );
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const { fetchStart, fetchSuccess, fetchError } = useFetchFeedback();

  const onSubmit = async (data: EditMovieFormData) => {
    fetchStart();
    try {
      let coverUrl: string | undefined = movie.coverImageUrl;
      if (selectedCoverFile) {
        const result = await uploadMovieCover(selectedCoverFile);
        coverUrl = result.url;
      }
      const payload = { ...data, coverImageUrl: coverUrl };
      await updateMovie(movie.id, payload);
      fetchSuccess("Filme atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      onSuccess?.();
    } catch (error: any) {
      fetchError(error?.response?.data?.message || "Erro ao atualizar filme");
    }
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
        id="originalTitle"
        label="Título original (opcional)"
        placeholder="The Lord of the Rings: The Fellowship of the Ring"
        {...register("originalTitle")}
        error={!!errors.originalTitle}
        helperText={errors.originalTitle?.message}
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
        name="productionBudget"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CurrencyInput
            id="productionBudget"
            label="Orçamento de Produção"
            value={typeof value === "number" ? value : 0}
            onChange={onChange}
            error={!!errors.productionBudget}
            helperText={errors.productionBudget?.message}
          />
        )}
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
            error={!!errors.genres}
            helperText={errors.genres?.message}
          />
        )}
      />

      <UploadImage
        value={localCoverUrl}
        onChange={(url) => {
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
