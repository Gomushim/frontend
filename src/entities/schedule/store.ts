import { create } from "zustand";
import { InitialSchedule, ScheduleStore } from "./type";

const initialSchedule: InitialSchedule = {
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

interface SelectedDateState {
  selectedMonth: Date;
  selectedDay: Date;
  setSelectedMonth: (date: Date) => void;
  setSelectedDay: (date: Date) => void;
}

export const useSelectedDateStore = create<SelectedDateState>(set => ({
  selectedMonth: new Date(),
  selectedDay: new Date(),
  setSelectedMonth: date => set({ selectedMonth: date }),
  setSelectedDay: date => set({ selectedDay: date }),
}));
