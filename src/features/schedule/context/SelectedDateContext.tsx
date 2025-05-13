import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedDateContextType {
  selectedMonth: Date;
  selectedDay: Date | null;
  setSelectedMonth: (date: Date) => void;
  setSelectedDay: (date: Date | null) => void;
}

const SelectedDateContext = createContext<SelectedDateContextType | null>(null);

interface SelectedDateProviderProps {
  children: ReactNode;
}

export const SelectedDateProvider = ({ children }: SelectedDateProviderProps) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  return (
    <SelectedDateContext.Provider
      value={{
        selectedMonth,
        selectedDay,
        setSelectedMonth,
        setSelectedDay,
      }}>
      {children}
    </SelectedDateContext.Provider>
  );
};

export const useSelectedDate = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error("useSelectedDate must be used within a SelectedDateProvider");
  }
  return context;
};
