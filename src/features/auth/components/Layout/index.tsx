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
    <header className="px-20 p-3 border-b border-gray-200 dark:border-gray-800  bg-gray-50 dark:bg-gray-900">
      {children}
    </header>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-15 flex-1 flex items-center justify-center">
      {children}
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="px-20 py-2 text-sm text-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {children}
    </footer>
  );
}

export const Layout = {
  Root,
  Header,
  Body,
  Footer,
};
