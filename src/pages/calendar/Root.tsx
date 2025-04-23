import { useState } from "react";
import { Calendar, ScheduleCard } from "@/components/calendar";
import { formatDateToKorean } from "@/utils/date/FomatDateToKr";

const schedultestData = [
  {
    id: 1,
    schedule: "KCTC 훈련",
    tag: "매우 피곤해요",
    time: "하루종일",
  },
  {
    id: 2,
    schedule: "근무 취짐",
    tag: "괜찮아요",
    time: "07:00~18:00",
  },
  {
    id: 3,
    schedule: "근무 취짐",
    tag: "조금 피곤해요",
    time: "07:00~18:00",
  },
];

export const CalendarRoot: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="">
      <Calendar initialDate={selectedDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="mt-7 flex w-full flex-col gap-3 bg-gray-50 p-5">
        <h2>{formatDateToKorean(selectedDate)}</h2>
        {schedultestData.map(schedul => (
          <ScheduleCard key={schedul.id} {...schedul} />
        ))}
      </div>
    </div>
  );
};
