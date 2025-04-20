import { useState } from "react";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 ~ 11

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  const calendarDays: (Date | null)[] = [];

  // 첫날을 위해 빈 칸 추가
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // 날짜 추가
  for (let date = 1; date <= lastDate; date++) {
    calendarDays.push(new Date(year, month, date));
  }

  // 남는 빈 칸을 추가
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  // 주 단위로 나누기 (마지막 줄에 빈 칸이 있을 경우 그 줄을 제외하고 렌더링)
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    const week = calendarDays.slice(i, i + 7);
    // week에서 하나라도 날짜가 존재하면 그 주를 렌더링
    if (week.some(date => date !== null)) {
      weeks.push(week);
    }
  }

  const goToPrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="mx-auto max-w-md">
      {/* 헤더 */}
      <div className="relative mb-3 flex justify-center px-3">
        <div className="flex items-center justify-center gap-2.5">
          <button onClick={goToPrevMonth} className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src="src/assets/icons/leftArrow.svg" alt="이전 달" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {year}년 {month + 1}월
          </h2>
          <button onClick={goToNextMonth} className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src="src/assets/icons/rightArrow.svg" alt="다음 달" />
          </button>
        </div>
        <div className="absolute top-0 right-3 flex items-center justify-center gap-2">
          <button onClick={goToPrevMonth} className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src="src/assets/icons/hambuk.svg" alt="이전 달" />
          </button>
          <button onClick={goToPrevMonth} className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src="src/assets/icons/plus.svg" alt="이전 달" />
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-1.5 text-center font-medium">
        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
          <div key={day} className={day === "일" ? "text-red-500" : ""}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 with 줄 */}
      <div className="">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className={weekIdx === weeks.length - 1 ? "" : "border-b border-gray-50 py-3"}>
            <div className="grid grid-cols-7 px-1.5 text-center">
              {week.map((date, idx) => {
                const isToday = date && isSameDate(date, today);
                const isSelected = date && selectedDate && isSameDate(date, selectedDate);
                const showToday = isToday && selectedDate === null;

                return (
                  <div
                    key={idx}
                    className={"flex cursor-pointer flex-col items-center justify-center"}
                    onClick={() => date && setSelectedDate(date)}>
                    <p
                      className={`text-md mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${showToday || isSelected ? "bg-gray-900 font-bold text-white" : ""} ${!date ? "cursor-default text-gray-300" : ""} ${date && !isSelected && !showToday ? "hover:bg-gray-100" : ""}`}>
                      {date ? date.getDate() : ""}
                    </p>
                    <div className="flex min-h-7 flex-col gap-1 pl-0.5">
                      <div className="flex h-3 w-10 items-center justify-center rounded-[8px] bg-red-50">
                        <p className="text-[10px]">test..</p>
                      </div>
                      <div className="flex h-3 w-10 items-center justify-center rounded-[8px] bg-red-50">
                        <p className="text-[10px]">test..</p>
                      </div>
                    </div>
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
