import React from "react";
import { ThemeToggleButton } from "@core/components/ThemeToggleButton";
import BrandLogo from "@core/components/BrandLogo";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <Link href="/" aria-label="Página inicial" className="shrink-0">
        <BrandLogo />
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggleButton />
      </div>
    </nav>
  );
};
