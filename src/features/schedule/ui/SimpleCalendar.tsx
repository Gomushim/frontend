import { useState } from "react";
import { getDateList, getShiftedWeekdays } from "../utils";

export const SimpleCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const shiftedDays = getShiftedWeekdays(today);
  const dateList = getDateList(today, 7, 1);

  // 날짜 비교 함수
  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    setSelectedDay(date);
  };

  return (
    <>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center font-medium">
        {shiftedDays.map((day, idx) => (
          <div key={idx} className={day === "일" ? "text-red-0" : ""}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="mb-7 grid grid-cols-7 gap-x-1 py-3 text-center">
        {dateList.map((date, idx) => {
          const isToday = date && isSameDate(date, today);
          const isSelected = date && selectedDay && isSameDate(date, selectedDay);
          const showToday = isToday && !selectedDay;

          return (
            <div
              key={idx}
              className="flex min-h-10 cursor-pointer items-center justify-center"
              onClick={() => handleDateClick(date)}>
              <p
                className={`text-md flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${
                  showToday || isSelected ? "bg-gray-900 font-bold text-white" : ""
                } ${!date ? "cursor-default text-gray-300" : ""} ${
                  date && !isSelected && !showToday ? "hover:bg-gray-100" : ""
                }`}>
                {date ? date.getDate() : ""}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
