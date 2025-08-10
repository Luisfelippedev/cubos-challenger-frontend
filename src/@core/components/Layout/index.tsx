import React from "react";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {children}
    </main>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header
      className="
        relative       
        h-90                 
        flex
        items-center
        justify-center
        px-20
        py-4
        border-b border-gray-200 dark:border-gray-800
        bg-gray-50 dark:bg-gray-900
      "
    >
      {children}
    </header>
  );
}

function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className="
        absolute
        top-0 left-0 right-0
        flex items-center justify-center
        px-20 py-4
        bg-transparent
        pointer-events-auto
        z-10
      "
    >
      {children}
    </nav>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 px-20 py-10 flex items-center justify-center">
      {children}
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
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
}

export const CoreLayout = {
  Root,
  Header,
  Navbar,
  Body,
  Footer,
};
