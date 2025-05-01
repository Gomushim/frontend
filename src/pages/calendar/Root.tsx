import { useState } from "react";
import { ScheduleCard, Calendar } from "@/features/schedule/widgets";
import { formatDateKoreanWithWeekday } from "@/shared/utils";
import { useGetCalendarSchedule } from "@/entities/schedule/query";

export const CalendarRoot: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: scheduleData } = useGetCalendarSchedule(selectedDate);
  // const { data: scheduleListData } = useGetScheduleList(selectedDate);

  if (!scheduleData) {
    return;
  }

  return (
    <div className="">
      <Calendar
        initialDate={selectedDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        tags={scheduleData.result.schedules}
      />
      <div className="mt-7 flex w-full flex-col gap-3 bg-gray-50 p-5">
        <h2>{formatDateKoreanWithWeekday(selectedDate)}</h2>
        {scheduleData.result.schedules.map((schedul, index) => (
          <ScheduleCard key={index} {...schedul} />
        ))}
      </div>
    </div>
  );
};
