import React from "react";
import { ThemeToggleButton } from "@core/components/ThemeToggleButton";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-full" />
        <span className="text-lg font-semibold">Panda Filmes</span>
      </div>

      <ThemeToggleButton />
    </nav>
  );
};
