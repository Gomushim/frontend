import { useSelectedDateStore } from "@/entities/schedule";
import { useMemo } from "react";
import { Link } from "react-router";
import { CalendarBottomSheet } from "./CalendarBottomSheet";
import { useGetCalendarSchedule } from "@/entities/schedule/query";

// 날짜 비교를 위한 정규화 함수 (시, 분, 초 제거)
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

export const Calendar = () => {
  const { selectedMonth, selectedDay, setSelectedMonth, setSelectedDay } = useSelectedDateStore();

  const { data: scheduleData } = useGetCalendarSchedule(selectedMonth);

  const normalizedTags = useMemo(() => {
    return (
      scheduleData &&
      scheduleData.result.schedules.map(tag => ({
        ...tag,
        startDate: normalizeDate(new Date(tag.startDate)),
        endDate: normalizeDate(new Date(tag.endDate)),
      }))
    );
  }, [scheduleData]);

  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  // 태그 날짜 정규화

  const calendarDays: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let date = 1; date <= lastDate; date++) {
    calendarDays.push(new Date(year, month, date));
  }
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    const week = calendarDays.slice(i, i + 7);
    if (week.some(date => date !== null)) {
      weeks.push(week);
    }
  }

  return (
    <div className="mx-auto max-w-md p-5">
      {/* 헤더 */}
      <div className="relative mb-3 flex justify-between">
        <div className="flex items-center justify-center gap-2.5">
          <CalendarBottomSheet year={year} month={month} setCurrentDate={setSelectedMonth} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link to="/calendar/dday" className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src="src/assets/icons/hambuk.svg" alt="D-day 보러가기" />
          </Link>
          <Link to="/calendar/schedule" className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src="src/assets/icons/plus.svg" alt="일정 추가" />
          </Link>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-1.5 text-center font-medium">
        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
          <div key={day} className={day === "일" ? "text-red-0" : ""}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div>
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className={weekIdx === weeks.length - 1 ? "" : "border-b border-gray-50 py-3"}>
            <div className="grid grid-cols-7 px-1.5 text-center">
              {week.map((date, idx) => {
                const isToday = date && isSameDay(date, today);
                const isSelected = date && selectedDay && isSameDay(date, selectedDay);
                const showToday = isToday && selectedDay === null;

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
                        <div
                          key={tag.id}
                          className={`flex h-3 w-10 items-center justify-center rounded-[8px] ${bgColor}`}>
                          <p className={`truncate text-[10px] ${textColor}`}>{tag.title}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
