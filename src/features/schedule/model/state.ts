import { Fatigue } from "@/entities/schedule";

export interface InitialSchedule {
  id: number | null;
  title: string;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  fatigue: Fatigue | string;
}
