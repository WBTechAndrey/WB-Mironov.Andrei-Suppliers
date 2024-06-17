import { createContext, FC, ReactNode, useContext, useState } from "react";

interface GlobalStateContextType {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined,
);

export const GlobalStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <GlobalStateContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
