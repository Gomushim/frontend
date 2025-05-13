import { useMemo } from "react";
import { getDateList, getShiftedWeekdays } from "../utils";
import { useGetWeekSchedule } from "@/entities/schedule/query";
import { useSelectedDateStore } from "@/entities/schedule";

const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

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

export const MiniCalendar = () => {
  const { selectedDay, setSelectedDay } = useSelectedDateStore();
  const { data: weekScheduleData } = useGetWeekSchedule();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const normalizedTags = useMemo(() => {
    return (
      weekScheduleData &&
      weekScheduleData.result.schedules.map(tag => ({
        ...tag,
        startDate: normalizeDate(new Date(tag.startDate)),
        endDate: normalizeDate(new Date(tag.endDate)),
      }))
    );
  }, [weekScheduleData]);
  const shiftedDays = getShiftedWeekdays(today);
  const dateList = getDateList(today, 7, 1);

  // 날짜 비교 함수
  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  return (
    <>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-1.5 text-center font-medium">
        {shiftedDays.map((day, idx) => (
          <div key={idx} className={day === "일" ? "text-red-0" : ""}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="mb-7 grid grid-cols-7 px-1.5 py-3 text-center">
        {dateList.map((date, idx) => {
          const isToday = isSameDate(date, today);
          const isSelected = selectedDay && isSameDate(date, selectedDay);
          const showToday = isToday && !selectedDay;

          const dayTags =
            date != null
              ? normalizedTags.filter(tag => {
                  const d = normalizeDate(date);
                  return d >= tag.startDate && d <= tag.endDate;
                })
              : [];

          return (
            <div
              key={idx}
              className="flex min-h-16 cursor-pointer flex-col items-center gap-1"
              onClick={() => date && setSelectedDay(date)}>
              <p
                className={`text-md mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${
                  showToday || isSelected ? "bg-gray-900 font-bold text-white" : ""
                } ${!date ? "cursor-default text-gray-300" : ""} ${
                  date && !isSelected && !showToday ? "hover:bg-gray-100" : ""
                }`}>
                {date ? date.getDate() : ""}
              </p>
              {dayTags.map(tag => {
                const { bgColor, textColor } = fatigueTagMap[tag.fatigue || "VERY_TIRED"];

                return (
                  <div key={tag.id} className={`flex h-3 w-10 items-center justify-center rounded-[8px] ${bgColor}`}>
                    <p className={`truncate text-[10px] ${textColor}`}>{tag.title}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
