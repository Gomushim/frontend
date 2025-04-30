import { Fatigue } from "@/entities/schedule";

export interface ScheduleOverViewProps {
  fatigue: Fatigue | string;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
}
