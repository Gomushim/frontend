import { useState, useMemo, useCallback } from "react";
import { Emoji } from "@/entities/d-day";
import { InitialDday } from "../model";

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

  const handleChange = useCallback(<K extends keyof InitialDday>(field: K, value: InitialDday[K]) => {
    setNewDdayState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return {
    newDdayState,
    setNewDdayState,
    isFormValid,
    handleChange,
  };
}
