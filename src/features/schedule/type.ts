import { Fatigue } from "@/entities/schedule/model";

export interface ScheduleOverViewProps {
  fatigue: Fatigue | string;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
}
