import { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
