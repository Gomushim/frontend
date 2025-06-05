import { useSelectedDate } from "@/features/schedule/context/SelectedDateContext";
import { useMemo } from "react";
import { Link } from "react-router";
import { CalendarBottomSheet } from "./CalendarBottomSheet";
import { useGetCalendarSchedule } from "@/entities/schedule/query";
import { FATIGUE_TAG } from "../model";
import HambukIcon from "@/assets/icons/hambuk.svg";
import PlusIcon from "@/assets/icons/plus.svg";

// 날짜 비교를 위한 정규화 함수 (시, 분, 초 제거)
const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const Calendar = () => {
  const { selectedMonth, selectedDay, setSelectedMonth, setSelectedDay } = useSelectedDate();

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

  const normalizedAnniversaries = useMemo(() => {
    return (
      scheduleData &&
      scheduleData.result.anniversaries.map(anniversary => ({
        ...anniversary,
        date: normalizeDate(new Date(anniversary.anniversaryDate)),
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
          <CalendarBottomSheet
            year={year}
            month={month}
            setCurrentDate={setSelectedMonth}
            setSelectedDay={setSelectedDay}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link
            to="/calendar/dday"
            state={{ from: "/calendar" }}
            className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src={HambukIcon} alt="D-day 보러가기" />
          </Link>
          <Link
            to="/calendar/schedule/new"
            state={{ from: "/calendar" }}
            className="flex h-6 w-6 cursor-pointer items-center justify-center pb-1">
            <img src={PlusIcon} alt="일정 추가" />
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
        {weeks.map((week, weekIdx) => {
          // 연속 일정만 그리드 행 할당
          const continuousSchedules = new Map<number, number>(); // scheduleId -> gridRow
          let maxGridRow = 0;

          week.forEach(date => {
            if (!date) return;
            const dateSchedules = normalizedTags.filter(tag => {
              const d = normalizeDate(date);
              return d >= tag.startDate && d <= tag.endDate;
            });

            // 연속 일정만 필터링
            const continuous = dateSchedules.filter(
              schedule => schedule.startDate.getTime() !== schedule.endDate.getTime()
            );

            continuous.forEach(schedule => {
              if (!continuousSchedules.has(schedule.id)) {
                // 이 일정의 시작일과 겹치는 다른 연속 일정이 있는지 확인
                const overlapping = continuous.some(
                  other =>
                    other.id !== schedule.id &&
                    other.startDate.getTime() <= schedule.startDate.getTime() &&
                    other.endDate.getTime() >= schedule.startDate.getTime()
                );

                if (overlapping) {
                  // 겹치는 일정이 있으면 새로운 행 찾기
                  let row = 1;
                  while (Array.from(continuousSchedules.values()).includes(row)) {
                    row++;
                  }
                  continuousSchedules.set(schedule.id, row);
                  maxGridRow = Math.max(maxGridRow, row);
                } else {
                  // 겹치지 않으면 첫 번째 행에 배치
                  continuousSchedules.set(schedule.id, 1);
                  maxGridRow = Math.max(maxGridRow, 1);
                }
              }
            });
          });

          return (
            <div
              key={weekIdx}
              className={weekIdx === weeks.length - 1 ? "pt-3" : "overflow-hidden border-b border-gray-50 py-3"}>
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

                  const dayAnniversaries =
                    date != null
                      ? normalizedAnniversaries.filter(anniversary => {
                          const d = normalizeDate(date);
                          return d.getTime() === anniversary.date.getTime();
                        })
                      : [];

                  // 연속 일정과 단일 일정 분리
                  const continuousTags = dayTags.filter(tag => tag.startDate.getTime() !== tag.endDate.getTime());
                  const singleDayTags = dayTags.filter(tag => tag.startDate.getTime() === tag.endDate.getTime());

                  // 현재 날짜에 실제로 표시되는 연속 일정의 최대 행 번호 계산
                  const currentDayMaxRow = continuousTags.reduce((max, tag) => {
                    const row = continuousSchedules.get(tag.id) || 1;
                    return Math.max(max, row);
                  }, 0);

                  return (
                    <div
                      key={idx}
                      className="relative flex min-h-16 cursor-pointer flex-col items-center"
                      onClick={() => date && setSelectedDay(date)}>
                      <p
                        className={`text-md mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${
                          showToday || isSelected ? "bg-gray-900 font-bold text-white" : ""
                        } ${!date ? "cursor-default text-gray-300" : ""} ${
                          date && !isSelected && !showToday ? "hover:bg-gray-100" : ""
                        }`}>
                        {date ? date.getDate() : ""}
                      </p>
                      <div className="flex w-full flex-col gap-1 px-0.5">
                        {/* 연속 일정 그리드 */}
                        {currentDayMaxRow > 0 && (
                          <div
                            className="grid w-full gap-1"
                            style={{
                              gridTemplateRows: `repeat(${currentDayMaxRow}, 20px)`,
                            }}>
                            {continuousTags.map(tag => {
                              const { bgColor, textColor } = FATIGUE_TAG[tag.fatigue || "VERY_TIRED"];
                              const currentDate = normalizeDate(date!);
                              const isFirstDay = currentDate.getTime() === tag.startDate.getTime();
                              const isLastDay = currentDate.getTime() === tag.endDate.getTime();
                              const isMiddleDay = !isFirstDay && !isLastDay;
                              const gridRow = continuousSchedules.get(tag.id) || 1;

                              let containerStyle = "flex h-4 items-center";

                              if (isFirstDay) {
                                containerStyle += " w-[calc(100%)] -mr-4 rounded-l-[4px] relative z-10 truncate";
                              } else if (isLastDay) {
                                containerStyle += " w-[calc(100%+4px)] -ml-1 rounded-r-[4px]";
                              } else if (isMiddleDay) {
                                containerStyle += " w-[calc(100%+4px)] -mx-1";
                              }

                              return (
                                <div key={tag.id} style={{ gridRow }} className={`${containerStyle} ${bgColor}`}>
                                  <p
                                    className={`w-full px-1 text-[10px] ${textColor} ${isFirstDay ? "absolute left-1 text-left whitespace-nowrap" : ""}`}>
                                    {isFirstDay && tag.title}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 단일 일정 스택 */}
                        <div className="flex w-full flex-col gap-1">
                          {/* 기념일 표시 */}
                          {dayAnniversaries.map((anniversary, index) => (
                            <div
                              key={`${anniversary.title}-${index}`}
                              className="flex h-4 w-full items-center rounded-[4px] bg-[rgb(255,232,117,0.6)]">
                              <p className="w-full truncate px-1 text-[10px] text-[#7B6901]">{anniversary.title}</p>
                            </div>
                          ))}
                          {/* 일반 일정 */}
                          {singleDayTags.map(tag => {
                            const { bgColor, textColor } = FATIGUE_TAG[tag.fatigue || "VERY_TIRED"];
                            return (
                              <div key={tag.id} className={`flex h-4 w-full items-center rounded-[4px] ${bgColor}`}>
                                <p className={`w-full truncate text-[10px] ${textColor}`}>{tag.title}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
