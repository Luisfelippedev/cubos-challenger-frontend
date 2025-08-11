"use client";

import Input from "@core/components/ui/Input";
import Button from "@core/components/ui/Button";
import { Modal } from "@core/components/ui/Modal";
import Select from "@core/components/ui/Select";
import TimeInput from "@core/components/ui/Input/TimeInput";
import { GENRE_OPTIONS } from "src/features/movies/types/genreOptions";
import { Filter, Plus } from "lucide-react";
import type { ListMovieParams } from "../List/types";
import { useState } from "react";

interface MoviesToolbarProps {
  search: string;
  onChangeSearch: (value: string) => void;
  onClickAdd: () => void;
  onApplyFilters: (
    filters: Omit<ListMovieParams, "page" | "perPage" | "search">
  ) => void;
  initialFilters?: Omit<ListMovieParams, "page" | "perPage" | "search">;
}

export const MoviesToolbar = ({
  search,
  onChangeSearch,
  onClickAdd,
  onApplyFilters,
  initialFilters,
}: MoviesToolbarProps) => {
  const [openFilters, setOpenFilters] = useState(false);

  const [genre, setGenre] = useState<string | undefined>(initialFilters?.genre);
  const [releaseDateStart, setReleaseDateStart] = useState<string | undefined>(
    initialFilters?.releaseDateStart
  );
  const [releaseDateEnd, setReleaseDateEnd] = useState<string | undefined>(
    initialFilters?.releaseDateEnd
  );
  const [durationMin, setDurationMin] = useState<number | undefined>(
    initialFilters?.durationMin
  );
  const [durationMax, setDurationMax] = useState<number | undefined>(
    initialFilters?.durationMax
  );

  const handleApply = () => {
    onApplyFilters({
      genre,
      releaseDateStart,
      releaseDateEnd,
      durationMin,
      durationMax,
    });
    setOpenFilters(false);
  };

  const handleClear = () => {
    setGenre(undefined);
    setReleaseDateStart(undefined);
    setReleaseDateEnd(undefined);
    setDurationMin(undefined);
    setDurationMax(undefined);
    onApplyFilters({});
    setOpenFilters(false);
  };

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full">
        <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur p-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="w-full max-w-md">
              <Input
                id="search-movies"
                placeholder="Buscar filmes por título ou descrição..."
                value={search}
                onChange={(e) => onChangeSearch(e.target.value)}
              />
            </div>
            <Button
              variant="icon"
              aria-label="Abrir filtros"
              onClick={() => setOpenFilters(true)}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="w-full sm:w-auto"
              onClick={onClickAdd}
              startIcon={<Plus className="h-4 w-4" />}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>

      <Modal.Root open={openFilters} onClose={() => setOpenFilters(false)}>
        <div className="relative p-6">
          <Modal.Title>Filtrar filmes</Modal.Title>
          <Modal.CloseButton />
        </div>
        <Modal.Content>
          <div className="space-y-4">
            <Select
              id="filter-genre"
              label="Gênero"
              placeholder="Selecione um gênero"
              options={GENRE_OPTIONS}
              value={genre}
              onChange={setGenre}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  id="filter-release-start"
                  label="Lançamento (início)"
                  type="date"
                  value={releaseDateStart ?? ""}
                  onChange={(e) =>
                    setReleaseDateStart(e.target.value || undefined)
                  }
                />
              </div>
              <div>
                <Input
                  id="filter-release-end"
                  label="Lançamento (fim)"
                  type="date"
                  value={releaseDateEnd ?? ""}
                  onChange={(e) =>
                    setReleaseDateEnd(e.target.value || undefined)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <TimeInput
                  id="filter-duration-min"
                  label="Duração mínima (HH:MM)"
                  value={durationMin ?? 0}
                  onChange={(v) => setDurationMin(v || undefined)}
                />
              </div>
              <div>
                <TimeInput
                  id="filter-duration-max"
                  label="Duração máxima (HH:MM)"
                  value={durationMax ?? 0}
                  onChange={(v) => setDurationMax(v || undefined)}
                />
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action variant="cancel">Cancelar</Modal.Action>
          <Modal.Action variant="danger" onClick={handleClear}>
            Limpar
          </Modal.Action>
          <Modal.Action variant="confirm" onClick={handleApply}>
            Aplicar
          </Modal.Action>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};

export default MoviesToolbar;
