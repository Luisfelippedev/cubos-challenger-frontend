import React from "react";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {children}
    </main>
  );
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="z-10 fixed w-full px-4 sm:px-8 md:px-12 lg:px-20 p-1 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      {children}
    </header>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 w-full  sm:px-6 md:px-8 lg:px-8  2xl:px-12 py-25 sm:py-20 md:py-20">
      {children}
    </div>
  );
};

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer
      className="
        px-4 sm:px-8 md:px-12 lg:px-20 py-2 text-sm text-center
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
  Body,
  Footer,
};
