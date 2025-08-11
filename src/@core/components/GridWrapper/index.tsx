import React from "react";
import clsx from "clsx";

interface GridWrapperProps {
  children: React.ReactNode;
  ariaLabel?: string;
  gapClassName?: string;
  paddingClassName?: string;
  colsSmall?: number;
  colsMedium?: number;
  colsLarge?: number;
  colsMd?: number;
  colsXLarge?: number;
}
const GridWrapper: React.FC<GridWrapperProps> = ({
  children,
  ariaLabel = "Lista de itens",
  gapClassName = "gap-10",
  colsSmall = 1,
  colsMedium = 2,
  colsLarge = 3,
  colsMd,
  colsXLarge,
}) => {
  const gridClasses = clsx(
    "grid w-full",
    {
      "grid-cols-1": colsSmall === 1,
      "grid-cols-2": colsSmall === 2,
      "grid-cols-3": colsSmall === 3,
      "grid-cols-4": colsSmall === 4,
    },
    {
      "sm:grid-cols-1": colsMedium === 1,
      "sm:grid-cols-2": colsMedium === 2,
      "sm:grid-cols-3": colsMedium === 3,
      "sm:grid-cols-4": colsMedium === 4,
    },
    colsMd && {
      "md:grid-cols-1": colsMd === 1,
      "md:grid-cols-2": colsMd === 2,
      "md:grid-cols-3": colsMd === 3,
      "md:grid-cols-4": colsMd === 4,
    },
    {
      "lg:grid-cols-1": colsLarge === 1,
      "lg:grid-cols-2": colsLarge === 2,
      "lg:grid-cols-3": colsLarge === 3,
      "lg:grid-cols-4": colsLarge === 4,
    },
    colsXLarge && {
      "xl:grid-cols-1": colsXLarge === 1,
      "xl:grid-cols-2": colsXLarge === 2,
      "xl:grid-cols-3": colsXLarge === 3,
      "xl:grid-cols-4": colsXLarge === 4,
    },
    gapClassName
  );

  return (
    <section aria-label={ariaLabel} className={gridClasses}>
      {children}
    </section>
  );
};

export default GridWrapper;
