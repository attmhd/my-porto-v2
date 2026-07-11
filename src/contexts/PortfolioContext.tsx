import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_PORTFOLIO_DATA,
  PortfolioData,
  clonePortfolioData,
  loadPortfolioData as loadLocalPortfolioData,
} from "../data/portfolio";
import {
  getPortfolioStorageLabel,
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
} from "../services/portfolioRepository";

interface PortfolioContextValue {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  saveData: (nextData: PortfolioData) => Promise<void>;
  resetData: () => Promise<void>;
  isReady: boolean;
  storageLabel: "Supabase" | "Local storage";
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<PortfolioData>(
    () => loadLocalPortfolioData(),
  );
  const [isReady, setIsReady] = useState(false);
  const [storageLabel, setStorageLabel] = useState<
    "Supabase" | "Local storage"
  >(getPortfolioStorageLabel());

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      const initialData = await loadPortfolioData();
      if (!mounted) {
        return;
      }

      setData(initialData);
      setStorageLabel(getPortfolioStorageLabel());
      setIsReady(true);
    };

    void hydrate();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      data,
      setData,
      saveData: async (nextData) => {
        const payload = clonePortfolioData(nextData);
        setData(payload);
        await savePortfolioData(payload);
      },
      resetData: async () => {
        const defaultData = await resetPortfolioData();
        setData(defaultData);
      },
      isReady,
      storageLabel,
    }),
    [data, isReady, storageLabel, setData],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
