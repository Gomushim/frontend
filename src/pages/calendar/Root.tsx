import { useState } from "react";
import { ScheduleCard, Calendar } from "@/features/schedule/widgets";
import { formatDateKoreanWithWeekday } from "@/shared/utils";

const schedultestData = [
  {
    id: 1,
    schedule: "KCTC 훈련",
    tag: "VERY_TIRED",
    time: "하루종일",
  },
  {
    id: 2,
    schedule: "근무 취짐",
    tag: "GOOD",
    time: "07:00~18:00",
  },
  {
    id: 3,
    schedule: "근무 취짐",
    tag: "TIRED",
    time: "07:00~18:00",
  },
];

export const CalendarRoot: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="">
      <Calendar initialDate={selectedDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="mt-7 flex w-full flex-col gap-3 bg-gray-50 p-5">
        <h2>{formatDateKoreanWithWeekday(selectedDate)}</h2>
        {schedultestData.map(schedul => (
          <ScheduleCard key={schedul.id} {...schedul} />
        ))}
      </div>
    </div>
  );
};
