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
}
const GridWrapper: React.FC<GridWrapperProps> = ({
  children,
  ariaLabel = "Lista de itens",
  gapClassName = "gap-10",
  paddingClassName = "p-4",
  colsSmall = 1,
  colsMedium = 2,
  colsLarge = 3,
}) => {
  const gridClasses = clsx(
    "grid",
    "px-4 sm:px-5 md:px-10 lg:px-35",
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
    {
      "lg:grid-cols-1": colsLarge === 1,
      "lg:grid-cols-2": colsLarge === 2,
      "lg:grid-cols-3": colsLarge === 3,
      "lg:grid-cols-4": colsLarge === 4,
    },
    gapClassName,
    paddingClassName
  );

  return (
    <section aria-label={ariaLabel} className={gridClasses}>
      {children}
    </section>
  );
};

export default GridWrapper;
