import { FetchContext } from "@core/providers/FetchProvider";
import { useContext } from "react";

export const useFetchFeedback = () => {
  const context = useContext(FetchContext);
  if (!context)
    throw new Error("useFetchFeedback deve ser usado dentro de FetchProvider");
  return context;
};
