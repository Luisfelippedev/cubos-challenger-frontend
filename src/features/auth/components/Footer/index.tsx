import React from "react";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} Panda Filmes. Todos os direitos reservados.
    </footer>
  );
};
