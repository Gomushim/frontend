import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";

interface CalendarProps {
  initialDate?: Date;
  selectedDate: Date;

  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

export const Calendar = ({ initialDate = new Date(), selectedDate, setSelectedDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const navigate = useNavigate();

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

  // 주 단위로 나누기
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    const week = calendarDays.slice(i, i + 7);
    if (week.some(date => date !== null)) {
      weeks.push(week);
    }
  }

  //  변경 예정
  const goToPrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // D-day 페이지 경로로 이동
  const goToDdayPage = () => {
    navigate("/calendar/dday");
  };

  // 일정 추가 페이지 경로로 이동
  const goToAddSchedulePage = () => {
    navigate("/calendar/schedule");
  };

  return (
    <div className="mx-auto max-w-md p-5">
      {/* 헤더 */}
      <div className="relative mb-3 flex justify-between">
        <div className="flex items-center justify-center gap-2.5">
          <h2 className="text-xl font-semibold text-gray-900">
            {year}년 {month + 1}월
          </h2>
          <button className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1" onClick={goToPrevMonth}>
            <img src="src/assets/icons/bottomArrow.svg" alt="날짜 선택" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1" onClick={goToDdayPage}>
            <img src="src/assets/icons/hambuk.svg" alt="D-day 보러가기" />
          </button>
          <button
            className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1"
            onClick={goToAddSchedulePage}>
            <img src="src/assets/icons/plus.svg" alt="일정 추가" />
          </button>
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

      {/* 날짜 셀 with 줄 */}
      <div>
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
                    className="flex cursor-pointer flex-col items-center justify-center gap-1"
                    onClick={() => date && setSelectedDate(date)}>
                    <p
                      className={`text-md mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${showToday || isSelected ? "bg-gray-900 font-bold text-white" : ""} ${!date ? "cursor-default text-gray-300" : ""} ${date && !isSelected && !showToday ? "hover:bg-gray-100" : ""}`}>
                      {date ? date.getDate() : ""}
                    </p>
                    <div className="flex h-3 w-10 items-center justify-center rounded-[8px] bg-red-50">
                      <p className="text-[10px]">test..</p>
                    </div>
                    <div className="flex h-3 w-10 items-center justify-center rounded-[8px] bg-red-50">
                      <p className="text-[10px]">test..</p>
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
