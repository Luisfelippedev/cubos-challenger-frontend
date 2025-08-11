"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const BrandLogo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Image
        src={
          resolvedTheme === "dark"
            ? "/images/logos/logo-dark.png"
            : "/images/logos/logo-light.png"
        }
        alt="Header background"
        priority
        quality={100}
        width={50}
        height={50}
      />
      <span className="text-lg font-semibold">Panda Filmes</span>
    </div>
  );
};

export default BrandLogo;
