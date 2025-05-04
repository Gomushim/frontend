import { Fatigue } from "@/entities/schedule";

export interface ScheduleOverViewProps {
  id: number;
  title: string;
  fatigue: Fatigue;
  startDate: string;
  endDate: string;
}
