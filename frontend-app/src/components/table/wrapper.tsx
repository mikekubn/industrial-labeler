import type { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-auto max-w-full h-[calc(100vh-210px)] border border-gray-300 rounded-md shadow-sm">
      {children}
    </div>
  );
};

export { Wrapper };
