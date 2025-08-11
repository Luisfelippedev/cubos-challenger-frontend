"use client";

import React, { useRef } from "react";
import Button from "@core/components/ui/Button";
import { Image as ImageIcon, Trash2, UploadCloud } from "lucide-react";

interface UploadImageProps {
  label?: string;
  value?: string;
  onChange: (url?: string) => void;
  onUpload?: (file: File) => Promise<{ url: string }>;
  onSelect?: (file: File) => void;
  loading?: boolean;
}

const UploadImage = ({
  label = "Capa do Filme",
  value,
  onChange,
  onUpload,
  onSelect,
  loading,
}: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePick = () => inputRef.current?.click();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (onUpload) {
      const result = await onUpload(file);
      onChange(result.url);
    } else {
      onSelect?.(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">{label}</label>
        <div className="flex items-center gap-2">
          {value && (
            <Button
              type="button"
              variant="icon"
              title="Remover imagem"
              aria-label="Remover imagem"
              onClick={() => onChange(undefined)}
              disabled={loading}
            >
              <Trash2 size={16} />
            </Button>
          )}
          <Button
            type="button"
            title={value ? "Trocar imagem" : "Adicionar imagem"}
            aria-label={value ? "Trocar imagem" : "Adicionar imagem"}
            onClick={handlePick}
            disabled={loading}
          >
            {loading ? (
              <>
                <UploadCloud className="mr-2" size={16} /> Enviando...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2" size={16} />
                {value ? "Trocar" : "Adicionar"}
              </>
            )}
          </Button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="w-full h-40 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Pré-visualização da capa"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-xs text-gray-500">
            Nenhuma imagem selecionada
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
