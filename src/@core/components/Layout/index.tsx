import Image from "next/image";
import React from "react";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {children}
    </main>
  );
}

interface HeaderProps {
  children: React.ReactNode;
  srcBackground?: string;
}

const Header = ({ children, srcBackground }: HeaderProps) => {
  return (
    <header
      className="
        relative
        h-[560px]  
        flex
        items-center
        justify-center
        px-20
        py-4
        border-b border-gray-200 dark:border-gray-800
      "
    >
      {srcBackground && (
        <>
          <Image
            src={srcBackground}
            alt="Header background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
            className="absolute inset-0 z-0 select-none pointer-events-none"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        </>
      )}

      <div className="relative z-10 w-full flex justify-center items-center">
        {children}
      </div>
    </header>
  );
};

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav
      className="
        absolute
        top-0 left-0 right-0
        flex items-center justify-center
        bg-transparent
        pointer-events-auto
        z-10
      "
    >
      {children}
    </nav>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 px-20 py-10 flex items-center justify-center">
      {children}
    </div>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer
      className="
        px-20 py-2 text-sm text-center
        text-gray-600 dark:text-gray-400
        bg-gray-50 dark:bg-gray-900
        border-t border-gray-200 dark:border-gray-800
      "
    >
      {children}
    </footer>
  );
};

export const CoreLayout = {
  Root,
  Header,
  Navbar,
  Body,
  Footer,
};
