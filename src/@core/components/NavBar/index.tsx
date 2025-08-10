"use client";
import React, { useEffect, useState } from "react";
import { ThemeToggleButton } from "../ThemeToggleButton";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 py-4
        transition-colors duration-300 ease-in-out
        ${
          scrolled
            ? "bg-gray-50 bg-opacity-70 border-b border-gray-200 dark:bg-gray-900 dark:bg-opacity-70 dark:border-gray-800 backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }
      `}
      style={{ WebkitBackdropFilter: scrolled ? "blur(10px)" : "none" }}
    >
      <div className="text-lg font-bold">{scrolled && "Panda Filmes"}</div>

      <div className="flex gap-5 items-center justify-center">
        <div>Sair</div>
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
