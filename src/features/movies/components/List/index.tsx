"use client";

import React, { useState } from "react";
import { IMovie } from "../../types";
import { MovieCard } from "../Card";
import GridWrapper from "@core/components/GridWrapper";
import { useListMovies } from "./hooks/useListMovies";
import { Modal } from "@core/components/ui/Modal";
import { EditMovieForm, EditMovieFormHandles } from "../Forms/EditMovieForm";
import { useDeleteMovie } from "./hooks/useDeleteMovie";
import { formatDateForDisplay } from "@core/utils/date";

export const ListMovie = () => {
  const { data, isLoading, isError, error } = useListMovies();
  const [openEdit, setOpenEdit] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<IMovie | null>(null);
  const [openRemove, setOpenRemove] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<IMovie | null>(null);
  const [openView, setOpenView] = useState(false);
  const [movieToView, setMovieToView] = useState<IMovie | null>(null);
  const editFormRef = React.useRef<EditMovieFormHandles>(null);
  const deleteMutation = useDeleteMovie({
    onSuccess: () => setOpenRemove(false),
  });

  React.useEffect(() => {
    console.log("Dados recebidos da API:", data);
  }, [data]);

  if (isLoading)
    return <p className="text-center py-20">Carregando filmes...</p>;

  if (isError)
    return (
      <p className="text-center py-20 text-red-500">
        Erro: {error?.message || "Erro desconhecido"}
      </p>
    );

  return (
    <div className="mx-auto p-4 pt-[68px]">
      {data?.data.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          Nenhum filme encontrado.
        </p>
      ) : (
        <GridWrapper ariaLabel="Lista de filmes">
          {data?.data.map((movie: IMovie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDetails={(m) => {
                setMovieToView(m);
                setOpenView(true);
              }}
              onEdit={() => {
                setMovieToEdit(movie);
                setOpenEdit(true);
              }}
              onRemove={(m) => {
                setMovieToRemove(m);
                setOpenRemove(true);
              }}
            />
          ))}
        </GridWrapper>
      )}

      <Modal.Root open={openEdit} onClose={() => setOpenEdit(false)}>
        <div className="relative p-6">
          <Modal.Title>Editar Filme</Modal.Title>
          <Modal.CloseButton />
        </div>
        <Modal.Content>
          {movieToEdit && (
            <EditMovieForm
              ref={editFormRef}
              movie={movieToEdit}
              onSuccess={() => setOpenEdit(false)}
              formId="edit-movie-form"
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action variant="cancel">Cancelar</Modal.Action>
          <Modal.Action
            variant="confirm"
            onClick={() => {
              const form = document.getElementById(
                "edit-movie-form"
              ) as HTMLFormElement | null;
              form?.requestSubmit();
            }}
          >
            Salvar
          </Modal.Action>
        </Modal.Actions>
      </Modal.Root>

      <Modal.Root open={openView} onClose={() => setOpenView(false)}>
        <div className="relative p-6">
          <Modal.Title>Detalhes do Filme</Modal.Title>
          <Modal.CloseButton />
        </div>
        <Modal.Content>
          {movieToView && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {movieToView.coverImageUrl && (
                <div className="w-full h-40 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <img
                    src={movieToView.coverImageUrl}
                    alt={`Capa do filme ${movieToView.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="text-xs text-gray-500">Título</div>
                <div className="text-base font-semibold">
                  {movieToView.title}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-gray-500">Descrição</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line break-words max-h-60 overflow-y-auto pr-1">
                  {movieToView.description}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Duração</div>
                  <div className="text-sm">{movieToView.duration} min</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Lançamento</div>
                  <div className="text-sm">
                    {formatDateForDisplay(movieToView.releaseDate)}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-gray-500">Gêneros</div>
                <div className="flex flex-wrap gap-2">
                  {movieToView.genres.map((g) => (
                    <span
                      key={g}
                      className="bg-purple-600/80 text-white text-xs font-semibold px-2 py-1 rounded"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action variant="cancel">Fechar</Modal.Action>
        </Modal.Actions>
      </Modal.Root>

      <Modal.Root open={openRemove} onClose={() => setOpenRemove(false)}>
        <div className="relative p-6">
          <Modal.Title>Remover Filme</Modal.Title>
          <Modal.CloseButton />
        </div>
        <Modal.Content>
          <Modal.Description>
            Tem certeza que deseja remover o filme{" "}
            <span className="font-semibold">{movieToRemove?.title}</span>?
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action variant="cancel">Cancelar</Modal.Action>
          <Modal.Action
            variant="danger"
            onClick={() =>
              movieToRemove && deleteMutation.mutate(movieToRemove.id)
            }
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Removendo..." : "Remover"}
          </Modal.Action>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};
