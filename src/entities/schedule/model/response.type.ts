import { Dday } from "@/entities/d-day";
import { Letter } from "@/entities/letter";

export interface Fatigue {
  fatigue: "VERY_TIRED" | "TIRED" | "GOOD";
}

export interface Schedule {
  id: number;
  title: string;
  fatigue: Fatigue;
  startDate: Date;
  endDate: Date;
  letter: Omit<Letter, "content">[];
}

export interface ScheduleList {
  schedule: Omit<Schedule, "letter">[];
  dday: Dday[];
}

export interface CalendarSchedule {
  schedule: Omit<Schedule, "letter" | "startDate">[];
}
