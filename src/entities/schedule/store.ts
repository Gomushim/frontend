import { create } from "zustand";
import { Fatigue } from "./type";

interface Schedule {
  id: number | null;
  title: string;
  startDate: string;
  endDate: string;
  fatigue: Fatigue | string;
  isAllDay: boolean;
}

interface ScheduleStore {
  schedule: Schedule;
  setTitle: (title: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setFatigue: (fatigue: Fatigue) => void;
  setIsAllDay: (value: boolean) => void;
  reset: () => void;
}

const initialSchedule: Schedule = {
  id: null,
  title: "",
  startDate: "",
  endDate: "",
  fatigue: "",
  isAllDay: false,
};

export const useScheduleStore = create<ScheduleStore>(set => ({
  schedule: initialSchedule,
  setTitle: title => set(state => ({ schedule: { ...state.schedule, title } })),
  setStartDate: date => set(state => ({ schedule: { ...state.schedule, startDate: date } })),
  setEndDate: date => set(state => ({ schedule: { ...state.schedule, endDate: date } })),
  setFatigue: fatigue => set(state => ({ schedule: { ...state.schedule, fatigue } })),
  setIsAllDay: isAllDay => set(state => ({ schedule: { ...state.schedule, isAllDay } })),
  reset: () => set({ schedule: initialSchedule }),
}));
