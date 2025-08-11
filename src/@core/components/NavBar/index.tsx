import React from "react";
import { ThemeToggleButton } from "@core/components/ThemeToggleButton";
import BrandLogo from "@core/components/BrandLogo";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Button from "../ui/Button";
import { useJWTAuthActions } from "src/features/auth/providers/AuthProdiver";

const Navbar = () => {
  const { logout } = useJWTAuthActions();

  return (
    <nav className="flex justify-between items-center">
      <BrandLogo />

      <div className="flex items-center gap-4">
        <ThemeToggleButton />

        <Button
          variant="icon"
          aria-label={"Sair"}
          title={"Sair"}
          onClick={() => {
            logout();
          }}
        >
          <LogOut size={18} color="red" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
