import { Dday } from "@/entities/d-day";
import { Letter } from "@/entities/letter";

export enum Fatigue {
  VERY_TIRED = "VERY_TIRED",
  TIRED = "TIRED",
  GOOD = "GOOD",
}

export interface Schedule {
  id: number;
  title: string;
  fatigue: Fatigue;
  startDate: string;
  endDate: string;
  letter: Omit<Letter, "content">[];
}

export interface ScheduleListResponse {
  result: {
    schedules: Omit<Schedule, "letter" | "id">[];
    dday: Dday[];
  };
}

export interface CalendarSchedule {
  schedule: Omit<Schedule, "letter" | "startDate">[];
}

export interface ScheduleRequst {
  id?: number | null;
  title: string;
  startDate: string;
  endDate: string;
  fatigue: Fatigue | string;
  isAllDay: boolean;
}

export interface NewScheduleResponse {
  result: boolean;
}

export interface InitialSchedule {
  id: number | null;
  title: string;
  startDate: string;
  endDate: string;
  fatigue: Fatigue | string;
  isAllDay: boolean;
}

export interface ScheduleStore {
  schedule: InitialSchedule;
  setTitle: (title: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setFatigue: (fatigue: Fatigue) => void;
  setIsAllDay: (value: boolean) => void;
  reset: () => void;
}
