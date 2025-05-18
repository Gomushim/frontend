import { useState, useMemo } from "react";
import { Emoji } from "@/entities/d-day";

interface InitialDday {
  id: number | null;
  title: string;
  date: string;
  emoji: Emoji;
}

export function useNewDdayForm() {
  const initialState: InitialDday = {
    id: null,
    title: "",
    date: "",
    emoji: Emoji.HEART,
  };

  const [newDdayState, setNewDdayState] = useState<InitialDday>(initialState);

  const isFormValid = useMemo(() => {
    return newDdayState.title.trim() !== "" && newDdayState.date !== "";
  }, [newDdayState.title, newDdayState.date]);

  const handleChange = <K extends keyof InitialDday>(field: K, value: InitialDday[K]) => {
    setNewDdayState(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    newDdayState,
    setNewDdayState,
    isFormValid,
    handleChange,
  };
}
