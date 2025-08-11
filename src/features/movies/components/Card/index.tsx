import React, { useCallback } from "react";
import Image from "next/image";
import { Eye, Edit2, Trash, ImageOff } from "lucide-react";
import { IMovie } from "../../types";
import Button from "@core/components/ui/Button";
import { formatDateForDisplay } from "@core/utils/date";

interface MovieCardProps {
  movie: IMovie;
  onDetails?: (movie: IMovie) => void;
  onEdit?: (movie: IMovie) => void;
  onRemove?: (movie: IMovie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onDetails,
  onEdit,
  onRemove,
}) => {
  const { title, releaseDate, duration, genres, coverImageUrl } = movie;

  const formattedDate = formatDateForDisplay(releaseDate);

  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.03] text-white flex flex-col h-[600px]"
      aria-label={`Cartão do filme ${title}`}
    >
      {coverImageUrl ? (
        <>
          <Image
            src={"/images/backgrounds/cinema-bg.png"}
            alt={`Capa do filme ${title}`}
            fill
            style={{ objectFit: "cover", opacity: 1 }}
            quality={75}
            priority={false}
            className="absolute inset-0 z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-2" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center px-4 text-center z-2">
          <ImageOff className="text-gray-600 opacity-40" size={60} />
          <p className="mt-2 text-gray-500 text-sm select-none">
            Capa não disponível
          </p>
        </div>
      )}

      <div className="relative p-6 flex flex-col flex-grow justify-end z-2">
        <h2 className="text-2xl font-bold leading-tight mb-1 line-clamp-2">
          {title}
        </h2>

        <div className="text-sm text-gray-300 mb-3">{formattedDate}</div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-blue-600 bg-opacity-80 px-2 py-1 rounded text-xs font-semibold">
            {duration} min
          </span>
          {genres.map((genre) => (
            <span
              key={genre}
              className="bg-purple-600 bg-opacity-80 px-2 py-1 rounded text-xs font-semibold"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex space-x-2 bg-opacity-50 rounded-full p-1 self-end">
          <Button
            variant="icon"
            title="Detalhes"
            aria-label="Detalhes"
            onClick={() => onDetails && onDetails(movie)}
          >
            <Eye size={18} />
          </Button>

          <Button
            variant="icon"
            title="Editar"
            aria-label="Editar"
            onClick={() => onEdit && onEdit(movie)}
          >
            <Edit2 size={18} />
          </Button>

          <Button
            variant="icon"
            title="Remover"
            aria-label="Remover"
            onClick={() => onRemove && onRemove(movie)}
          >
            <Trash size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
