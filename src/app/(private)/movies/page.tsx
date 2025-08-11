"use client";
import { CoreLayout } from "@core/components/Layout";
import Navbar from "@core/components/NavBar";
import Button from "@core/components/ui/Button";
import { Modal } from "@core/components/ui/Modal";
import { useRef, useState } from "react";
import {
  CreateMovieForm,
  CreateMovieFormHandles,
  ListMovie,
  MoviesToolbar,
} from "src/features/movies/components";
import type { ListMovieParams } from "src/features/movies/components/List/types";

export default function MoviesPage() {
  const createMovieFormRef = useRef<CreateMovieFormHandles>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<
    Omit<ListMovieParams, "page" | "perPage" | "search">
  >({});

  return (
    <CoreLayout.Root>
      <CoreLayout.Header>
        <Navbar />
      </CoreLayout.Header>

      <CoreLayout.Body>
        <div className="w-full pt-4 space-y-4  mx-auto">
          <MoviesToolbar
            search={search}
            onChangeSearch={setSearch}
            onClickAdd={() => setOpen(true)}
            onApplyFilters={(f) => setFilters(f)}
            initialFilters={filters}
          />

          <ListMovie
            genre={filters.genre}
            releaseDateEnd={filters.releaseDateEnd}
            releaseDateStart={filters.releaseDateStart}
            durationMax={filters.durationMax}
            durationMin={filters.durationMin}
            search={search}
          />
        </div>
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
