import React from "react";

interface LoaderProps {
  fullscreen?: boolean;
}

const Loader = ({ fullscreen }: LoaderProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? "fixed inset-0 bg-black/40 z-[9999]" : ""
      }`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent" />
    </div>
  );
};

export default Loader;
