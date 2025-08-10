import React from "react";
import { ThemeToggleButton } from "@core/components/ThemeToggleButton";
import BrandLogo from "@core/components/BrandLogo";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <BrandLogo />

      <ThemeToggleButton />
    </nav>
  );
};
