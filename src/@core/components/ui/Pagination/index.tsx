"use client";

import React from "react";
import Button from "@core/components/ui/Button";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationRootProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

const RANGE = 1; 

const Root = ({
  page,
  totalPages,
  onChange,
  className,
}: PaginationRootProps) => {
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  const pages: (number | "ellipsis")[] = [];
  const start = Math.max(2, page - RANGE);
  const end = Math.min(totalPages - 1, page + RANGE);

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  return (
    <nav
      aria-label="Paginação"
      className={clsx(
        "mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-end",
        className
      )}
    >
      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-sm">
        <Button
          variant="icon"
          size="small"
          disabled={page <= 1}
          onClick={() => goTo(page - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <span
              key={`e-${idx}`}
              className="px-2 select-none text-gray-500 dark:text-gray-400"
            >
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === page ? "primary" : "secondary"}
              size="small"
              className={clsx(
                "rounded-md",
                p === page && "pointer-events-none"
              )}
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="icon"
          size="small"
          disabled={page >= totalPages}
          onClick={() => goTo(page + 1)}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export const Pagination = { Root };
