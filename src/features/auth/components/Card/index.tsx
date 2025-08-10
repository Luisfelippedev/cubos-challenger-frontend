import React from "react";

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 shadow-sm">
      {children}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl font-semibold mb-6 text-center">{children}</h1>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export const Card = {
  Root,
  Title,
  Body,
  Footer,
};
