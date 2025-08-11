"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const BrandLogo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      {mounted ? (
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
      ) : (
        <span
          className="inline-block h-[50px] w-[50px] rounded animate-pulse bg-gray-200 dark:bg-gray-700"
          aria-hidden
        />
      )}
      <span className="text-lg font-semibold">Panda Filmes</span>
    </div>
  );
};

export default BrandLogo;
