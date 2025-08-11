"use client";
import { CoreLayout } from "@core/components/Layout";
import Navbar from "@core/components/NavBar";
import Button from "@core/components/ui/Button";
import { Modal } from "@core/components/ui/Modal";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  CreateMovieForm,
  CreateMovieFormHandles,
  ListMovie,
} from "src/features/movies/components";
import { MovieCard } from "src/features/movies/components/Card";
import { IMovie } from "src/features/movies/types";

export default function MoviesPage() {
  const createMovieFormRef = useRef<CreateMovieFormHandles>(null);
  const [open, setOpen] = useState(false);

  return (
    <CoreLayout.Root>
      <CoreLayout.Header srcBackground="/images/backgrounds/cinema-bg.png">
        <CoreLayout.Navbar>
          <Navbar />
        </CoreLayout.Navbar>

        <div className="relative">
          <Image
            src={"/images/mascot/panda-frontal-angle.png"}
            alt="Header background"
            priority
            quality={100}
            width={250}
            height={250}
            className="absolute -bottom-45 -left-72 z-1 select-none pointer-events-none hidden lg:block"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-6xl font-extrabold">Panda Filmes</h1>

            <Button onClick={() => setOpen(true)} size="large">
              Adicionar Filme
            </Button>
          </div>
        </div>
      </CoreLayout.Header>

      <CoreLayout.Body>
        {/* Grid pai dos cards */}
        {/* <div
          className="grid gap-6 p-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {sampleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDetails={() => alert(`Detalhes do filme: ${movie.title}`)}
              onEdit={() => alert(`Editar filme: ${movie.title}`)}
              onRemove={() => alert(`Remover filme: ${movie.title}`)}
            />
          ))}
        </div> */}

        <ListMovie />
      </CoreLayout.Body>

      <Modal.Root open={open} onClose={() => setOpen(false)}>
        <div className="relative p-6">
          <Modal.Title>Adicionar Filme</Modal.Title>
          <Modal.CloseButton />
        </div>

        <Modal.Content>
          <CreateMovieForm
            ref={createMovieFormRef}
            onSuccess={() => setOpen(false)}
          />
        </Modal.Content>

        <Modal.Actions>
          <Modal.Action variant="cancel">Cancelar</Modal.Action>
          <Modal.Action
            variant="confirm"
            onClick={() => {
              createMovieFormRef.current?.submitForm();
            }}
          >
            Salvar
          </Modal.Action>
        </Modal.Actions>
      </Modal.Root>
    </CoreLayout.Root>
  );
}
