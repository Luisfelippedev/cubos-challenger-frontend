"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ThemeToggleButton } from "../ThemeToggleButton";
import Button from "../ui/Button";
import { useJWTAuthActions } from "src/features/auth/providers/AuthProdiver";
import BrandLogo from "../BrandLogo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { logout } = useJWTAuthActions();

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

  const handleExitButton = useCallback(() => {
    logout();
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 py-2 max-h-17
        transition-colors duration-300 ease-in-out
        ${
          scrolled
            ? "bg-gray-50 bg-opacity-70 border-b border-gray-200 dark:bg-gray-900 dark:bg-opacity-70 dark:border-gray-800 backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }
      `}
      style={{ WebkitBackdropFilter: scrolled ? "blur(10px)" : "none" }}
    >
      <div className="text-lg font-bold">{scrolled && <BrandLogo />}</div>

      <div className="flex gap-5 items-center justify-center">
        <Button size="small" onClick={handleExitButton}>
          Sair
        </Button>
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
