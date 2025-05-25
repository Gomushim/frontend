import { useMemo } from "react";
import { getDateList, getShiftedWeekdays } from "../utils";
import { useGetWeekSchedule } from "@/entities/schedule/query";
import { useSelectedDate } from "../context/SelectedDateContext";
import { FATIGUE_TAG } from "../model";

interface MiniCalendarProps {
  isConnected: boolean;
  isInitialized: boolean;
}

const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const MiniCalendar = ({ isConnected, isInitialized }: MiniCalendarProps) => {
  const { selectedDay, setSelectedDay } = useSelectedDate();
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

  const normalizedAnniversaries = useMemo(() => {
    return (
      weekScheduleData &&
      weekScheduleData.result.anniversaries.map(anniversary => ({
        ...anniversary,
        date: normalizeDate(new Date(anniversary.anniversaryDate)),
      }))
    );
  }, [weekScheduleData]);

  const shiftedDays = getShiftedWeekdays(today);
  const dateList = getDateList(today, 7, 1);

  // 날짜 비교 함수
  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  // 연속 일정 그리드 행 계산 (Calendar와 유사)
  // 7일만 보여주므로, 7칸짜리 그리드 한 줄만 있으면 됨
  // 겹치는 연속 일정이 있으면 행을 추가
  const continuousSchedules = new Map<number, number>(); // scheduleId -> gridRow
  let maxGridRow = 0;
  dateList.forEach(date => {
    if (!date || !normalizedTags) return;
    const dateSchedules = normalizedTags.filter(tag => {
      const d = normalizeDate(date);
      return d >= tag.startDate && d <= tag.endDate;
    });
    // 연속 일정만 필터링
    const continuous = dateSchedules.filter(schedule => schedule.startDate.getTime() !== schedule.endDate.getTime());
    continuous.forEach(schedule => {
      if (!continuousSchedules.has(schedule.id)) {
        // 이 일정의 시작일과 겹치는 다른 연속 일정이 있는지 확인
        const overlapping = Array.from(continuousSchedules.keys()).some(id => {
          const other = normalizedTags.find(t => t.id === id);
          if (!other) return false;
          // 겹치는지 확인
          return schedule.startDate <= other.endDate && schedule.endDate >= other.startDate;
        });
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
          const isToday = isSameDate(date, today);
          const isSelected = selectedDay && isSameDate(date, selectedDay);
          const showToday = isToday && !selectedDay;

          const dayTags =
            date != null && normalizedTags
              ? normalizedTags.filter(tag => {
                  const d = normalizeDate(date);
                  return d >= tag.startDate && d <= tag.endDate;
                })
              : [];

          const dayAnniversaries =
            date != null && normalizedAnniversaries
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
              {/* 연속 일정 그리드 */}
              {currentDayMaxRow > 0 && isConnected && isInitialized && (
                <div
                  className="mb-1 grid w-full gap-1.5"
                  style={{ gridTemplateRows: `repeat(${currentDayMaxRow}, 14px)` }}>
                  {continuousTags.map(tag => {
                    const { bgColor, textColor } = FATIGUE_TAG[tag.fatigue || "VERY_TIRED"];
                    const currentDate = normalizeDate(date!);
                    const calendarStart = normalizeDate(dateList[0]!);
                    const calendarEnd = normalizeDate(dateList[dateList.length - 1]!);
                    // 캘린더 범위 내에서만 제목/끝 표시
                    const isFirstDay =
                      currentDate.getTime() === tag.startDate.getTime() ||
                      (currentDate.getTime() === calendarStart.getTime() && tag.startDate < calendarStart);
                    const isLastDay =
                      currentDate.getTime() === tag.endDate.getTime() ||
                      (currentDate.getTime() === calendarEnd.getTime() && tag.endDate > calendarEnd);
                    const isMiddleDay = !isFirstDay && !isLastDay;
                    const gridRow = continuousSchedules.get(tag.id) || 1;

                    let containerStyle = "flex h-4 items-center";
                    if (isFirstDay) {
                      containerStyle += " w-[calc(100%)] -mr-1 rounded-l-[4px] relative z-10";
                    } else if (isLastDay) {
                      containerStyle += " w-[calc(100%+4px)] -ml-1 rounded-r-[4px]";
                    } else if (isMiddleDay) {
                      containerStyle += " w-[calc(100%+12px)] -mx-2";
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
              {isConnected && isInitialized && (
                <div className="flex w-full flex-col gap-1">
                  {/* 기념일 표시 */}
                  {dayAnniversaries.map((anniversary, index) => (
                    <div
                      key={`${anniversary.title}-${index}`}
                      className="flex h-4 w-full items-center rounded-[4px] bg-[rgb(255,232,117,0.6)]">
                      <p className="w-full truncate px-1 text-[10px] text-[#7B6901]">{anniversary.title}</p>
                    </div>
                  ))}
                  {singleDayTags.map(tag => {
                    const { bgColor, textColor } = FATIGUE_TAG[tag.fatigue || "VERY_TIRED"];
                    return (
                      <div key={tag.id} className={`flex h-4 w-full items-center rounded-[4px] ${bgColor}`}>
                        <p className={`w-full truncate text-[10px] ${textColor}`}>{tag.title}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
