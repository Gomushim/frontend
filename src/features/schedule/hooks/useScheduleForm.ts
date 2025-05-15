import { useState, useMemo } from "react";
import { InitialSchedule } from "../model";

export const useScheduleForm = (initialState?: Partial<InitialSchedule>) => {
  const [form, setForm] = useState<InitialSchedule>({
    id: null,
    title: "",
    startDate: "",
    endDate: "",
    isAllDay: false,
    fatigue: "",
    ...initialState, // 수정 시 기본값 주입
  });

  const isValid = useMemo(
    () => form.title.trim() !== "" && form.startDate !== "" && form.endDate !== "",
    [form.title, form.startDate, form.endDate]
  );

  const updateField = <K extends keyof InitialSchedule>(key: K, value: InitialSchedule[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return { form, setForm, updateField, isValid };
};
