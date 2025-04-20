import { useState } from "react";
import { Calendar } from "@/components/calendar";

export const CalendarRoot: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const initialDate = new Date();

  return (
    <div className="p-5">
      <Calendar initialDate={initialDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};
