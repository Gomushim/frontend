import { useState } from "react";
import { getDateList, getShiftedWeekdays } from "../utils";
import { ScheduleCard } from "./ScheduleCard";
import { Fatigue } from "@/entities/schedule";

const fatigueTagMap: Record<string, { bgColor: string; textColor: string }> = {
  VERY_TIRED: {
    bgColor: "bg-red-100",
    textColor: "text-red-0",
  },
  TIRED: {
    bgColor: "bg-green-100",
    textColor: "text-green-500",
  },
  GOOD: {
    bgColor: "bg-green-500",
    textColor: "text-white",
  },
};

const schedultestData = [
  {
    id: 1,
    title: "KCTC 훈련",
    fatigue: Fatigue.GOOD,
    startDate: "2025-04-30T16:10:30.567Z",
    endDate: "2025-04-30T16:10:30.567Z",
    isAllDay: false,
  },
  {
    id: 1,
    title: "근무 취짐",
    fatigue: Fatigue.GOOD,
    startDate: "2025-04-30T16:10:30.567Z",
    endDate: "2025-04-30T16:10:30.567Z",
    isAllDay: false,
  },
  {
    id: 1,
    title: "근무 취짐",
    fatigue: Fatigue.GOOD,
    startDate: "2025-04-30T16:10:30.567Z",
    endDate: "2025-04-30T16:10:30.567Z",
    isAllDay: false,
  },
];

export const MiniCalendar = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const shiftedDays = getShiftedWeekdays(today);
  const dateList = getDateList(today, 7, 1);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const testFatigue = "TIRED";
  const { bgColor, textColor } = fatigueTagMap[testFatigue];

  // 날짜 비교 함수
  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-4">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-1.5 text-center font-medium">
        {shiftedDays.map((day, idx) => (
          <div key={idx} className={day === "일" ? "text-red-0" : ""}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 px-1.5 py-3 text-center">
        {dateList.map((date, idx) => {
          const isToday = isSameDate(date, today);
          const isSelected = selectedDate && isSameDate(date, selectedDate);
          const showToday = isToday && !selectedDate;

          return (
            <div
              key={idx}
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
              onClick={() => setSelectedDate(date)}>
              <p
                className={`text-md mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${
                  isSelected || showToday ? "bg-gray-900 font-bold text-white" : ""
                }`}>
                {date.getDate()}
              </p>
              <div className={`${bgColor} flex h-3 w-10 items-center justify-center rounded-[8px]`}>
                <p className={`${textColor} text-[10px]`}>test</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-7 flex flex-col gap-3">
        {schedultestData.map((schedul, index) => (
          <ScheduleCard key={index} className="bg-gray-50" {...schedul} />
        ))}
      </div>
    </div>
  );
};
