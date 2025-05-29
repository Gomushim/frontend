import { Dday } from "@/entities/d-day";
import { Letter } from "../letter";

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
  isAllDay: boolean;
  letter: Omit<Letter, "comments">[];
}

export interface CalendarSchedule {
  schedule: Omit<Schedule, "letter" | "startDate">[];
}

// API 통신에서 쓰는 타입들
export interface ScheduleRequst {
  id?: number | null;
  title: string;
  startDate: string;
  endDate: string;
  fatigue: Fatigue | string;
  isAllDay: boolean;
}

export interface ScheduleListResponse {
  result: {
    schedules: Omit<Schedule, "letter">[];
    anniversaries: Omit<Dday[], "emoji">;
  };
}

export interface NewScheduleResponse {
  result: boolean;
}

export interface ScheduleDetailResponse {
  result: {
    id: number;
    title: string;
    fatigue: Fatigue;
    startDate: string;
    endDate: string;
    letters: Omit<Letter, "comments">[];
  };
}

// 전역 상태에서 쓰는 타입들
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
