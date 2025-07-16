import { useSelectedDate } from "@/features/schedule/context/SelectedDateContext";
import { useMemo } from "react";
import { Link } from "react-router";
import { CalendarBottomSheet } from "./CalendarBottomSheet";
import { useGetCalendarSchedule } from "@/entities/schedule/query";
import { FATIGUE_TAG } from "../model";
import HambukIcon from "@/assets/icons/hambuk.svg";
import PlusIcon from "@/assets/icons/plus.svg";

/**
 * 날짜 비교를 위한 정규화 함수
 * 시, 분, 초를 제거하여 날짜만 비교할 수 있도록 함
 * @param date - 정규화할 날짜 객체
 * @returns 시간 정보가 제거된 날짜 객체 (00:00:00)
 */
const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const Calendar = () => {
  // 선택된 월과 일을 관리하는 컨텍스트에서 상태와 setter 함수들을 가져옴
  const { selectedMonth, selectedDay, setSelectedMonth, setSelectedDay } = useSelectedDate();

  // 선택된 월의 일정 데이터를 서버에서 가져옴 (React Query 사용)
  const { data: scheduleData } = useGetCalendarSchedule(selectedMonth);

  /**
   * 일정 데이터를 정규화하여 메모이제이션
   * 서버에서 받은 일정의 시작일과 종료일을 정규화하여 날짜 비교에 사용
   */
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

  /**
   * 기념일 데이터를 정규화하여 메모이제이션
   * 서버에서 받은 기념일 날짜를 정규화하여 날짜 비교에 사용
   */
  const normalizedAnniversaries = useMemo(() => {
    return (
      scheduleData &&
      scheduleData.result.anniversaries.map(anniversary => ({
        ...anniversary,
        date: normalizeDate(new Date(anniversary.anniversaryDate)),
      }))
    );
  }, [scheduleData]);

  // 현재 선택된 월의 연도와 월 정보 추출
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();

  // 해당 월의 첫 번째 날이 무슨 요일인지 계산 (0: 일요일, 1: 월요일, ...)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // 해당 월의 마지막 날짜 계산
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 오늘 날짜 객체
  const today = new Date();

  /**
   * 두 날짜가 같은 날인지 비교하는 함수
   * 연도, 월, 일이 모두 같은지 확인
   */
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  /**
   * 캘린더 그리드를 위한 날짜 배열 생성
   * 총 42개의 셀(6주 × 7일)로 구성
   */
  const calendarDays: (Date | null)[] = [];

  // 월의 시작 전 빈 칸들을 null로 채움 (이전 달의 마지막 날들)
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // 현재 월의 실제 날짜들을 배열에 추가
  for (let date = 1; date <= lastDate; date++) {
    calendarDays.push(new Date(year, month, date));
  }

  // 6주 그리드(42개 셀)를 맞추기 위해 나머지 빈 칸들을 null로 채움
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  /**
   * 일주일 단위로 날짜들을 그룹화
   * 7일씩 묶어서 주 단위 배열 생성
   */
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    const week = calendarDays.slice(i, i + 7);
    // 해당 주에 실제 날짜가 하나라도 있는 경우만 추가
    if (week.some(date => date !== null)) {
      weeks.push(week);
    }
  }

  return (
    <div className="mx-auto max-w-md p-5">
      {/* 캘린더 상단 헤더 영역 */}
      <div className="relative mb-3 flex justify-between">
        {/* 왼쪽: 년월 선택 버튼 */}
        <div className="flex items-center justify-center gap-2.5">
          <CalendarBottomSheet
            year={year}
            month={month}
            setCurrentDate={setSelectedMonth}
            setSelectedDay={setSelectedDay}
          />
        </div>

        {/* 오른쪽: D-day 보기 및 일정 추가 버튼 */}
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

      {/* 요일 헤더 (일, 월, 화, 수, 목, 금, 토) */}
      <div className="grid grid-cols-7 px-1.5 text-center font-medium">
        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
          <div key={day} className={day === "일" ? "text-red-0" : ""}>
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 날짜 셀들 */}
      <div>
        {(() => {
          /**
           * 전체 월의 연속 일정 행 배치를 위한 전역 로직
           * 모든 연속 일정의 행을 미리 계산하여 주 간 일관성 유지
           */
          const globalContinuousSchedules = new Map<number, number>(); // scheduleId -> gridRow 매핑

          // 모든 연속 일정을 수집하고 시작일 순으로 정렬
          const allContinuousSchedules = normalizedTags
            .filter(schedule => schedule.startDate.getTime() !== schedule.endDate.getTime())
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

          // 각 연속 일정에 대해 전역 행 할당
          allContinuousSchedules.forEach(schedule => {
            if (!globalContinuousSchedules.has(schedule.id)) {
              // 현재 일정과 겹치는 다른 연속 일정이 있는지 확인
              const overlapping = allContinuousSchedules.some(
                other =>
                  other.id !== schedule.id &&
                  globalContinuousSchedules.has(other.id) &&
                  other.startDate.getTime() <= schedule.startDate.getTime() &&
                  other.endDate.getTime() >= schedule.startDate.getTime()
              );

              if (overlapping) {
                // 겹치는 일정이 있으면 사용되지 않은 새로운 행 찾기
                let row = 1;
                while (Array.from(globalContinuousSchedules.values()).includes(row)) {
                  row++;
                }
                globalContinuousSchedules.set(schedule.id, row);
              } else {
                // 겹치지 않으면 첫 번째 행에 배치
                globalContinuousSchedules.set(schedule.id, 1);
              }
            }
          });

          return weeks.map((week, weekIdx) => {
            // 현재 주에서 사용되는 최대 행 번호 계산
            let maxGridRow = 0;
            week.forEach(date => {
              if (!date) return;

              const dateSchedules = normalizedTags.filter(tag => {
                const d = normalizeDate(date);
                return d >= tag.startDate && d <= tag.endDate;
              });

              const continuous = dateSchedules.filter(
                schedule => schedule.startDate.getTime() !== schedule.endDate.getTime()
              );

              continuous.forEach(schedule => {
                const row = globalContinuousSchedules.get(schedule.id) || 1;
                maxGridRow = Math.max(maxGridRow, row);
              });
            });

            return (
              <div
                key={weekIdx}
                className={weekIdx === weeks.length - 1 ? "pt-3" : "overflow-hidden border-b border-gray-50 py-3"}>
                <div className="grid grid-cols-7 px-1.5 text-center">
                  {week.map((date, idx) => {
                    // 날짜 상태 확인
                    const isToday = date && isSameDay(date, today); // 오늘 날짜인지
                    const isSelected = date && selectedDay && isSameDay(date, selectedDay); // 선택된 날짜인지
                    const showToday = isToday && selectedDay === null; // 오늘 강조 표시 여부

                    /**
                     * 현재 날짜의 일정들 필터링
                     * 해당 날짜가 일정의 시작일과 종료일 사이에 있는지 확인
                     */
                    const dayTags =
                      date != null
                        ? normalizedTags.filter(tag => {
                            const d = normalizeDate(date);
                            return d >= tag.startDate && d <= tag.endDate;
                          })
                        : [];

                    /**
                     * 현재 날짜의 기념일들 필터링
                     * 기념일 날짜와 현재 날짜가 정확히 일치하는지 확인
                     */
                    const dayAnniversaries =
                      date != null
                        ? normalizedAnniversaries.filter(anniversary => {
                            const d = normalizeDate(date);
                            return d.getTime() === anniversary.date.getTime();
                          })
                        : [];

                    // 일정을 연속 일정과 단일 일정으로 분리
                    const continuousTags = dayTags.filter(tag => tag.startDate.getTime() !== tag.endDate.getTime());
                    const singleDayTags = dayTags.filter(tag => tag.startDate.getTime() === tag.endDate.getTime());

                    /**
                     * 현재 날짜에 실제로 표시되는 연속 일정의 최대 행 번호 계산
                     * 이를 통해 연속 일정 그리드의 높이를 결정
                     */
                    const currentDayMaxRow = continuousTags.reduce((max, tag) => {
                      const row = globalContinuousSchedules.get(tag.id) || 1;
                      return Math.max(max, row);
                    }, 0);

                    return (
                      <div
                        key={idx}
                        className="relative flex min-h-16 cursor-pointer flex-col items-center"
                        onClick={() => date && setSelectedDay(date)}>
                        {/* 날짜 숫자 표시 */}
                        <p
                          className={`text-md mb-2 flex h-8 w-8 items-center justify-center rounded-[12px] pt-0.5 text-center font-normal transition ${
                            showToday || isSelected ? "bg-gray-900 font-bold text-white" : ""
                          } ${!date ? "cursor-default text-gray-300" : ""} ${
                            date && !isSelected && !showToday ? "hover:bg-gray-100" : ""
                          }`}>
                          {date ? date.getDate() : ""}
                        </p>

                        {/* 일정 표시 영역 */}
                        <div className="flex w-full flex-col gap-1 px-0.5">
                          {/* 연속 일정 그리드 표시 */}
                          {currentDayMaxRow > 0 && (
                            <div className="relative">
                              {/* 연속 일정 배경 바 */}
                              <div
                                className="grid w-full gap-1"
                                style={{
                                  gridTemplateRows: `repeat(${currentDayMaxRow}, 20px)`, // 동적으로 행 개수 설정
                                }}>
                                {continuousTags.map(tag => {
                                  // 피로도에 따른 색상 가져오기
                                  const { bgColor } = FATIGUE_TAG[tag.fatigue || "VERY_TIRED"];
                                  const currentDate = normalizeDate(date!);

                                  // 연속 일정에서 현재 날짜의 위치 확인
                                  const isFirstDay = currentDate.getTime() === tag.startDate.getTime(); // 시작일
                                  const isLastDay = currentDate.getTime() === tag.endDate.getTime(); // 종료일
                                  const isMiddleDay = !isFirstDay && !isLastDay; // 중간일

                                  // 해당 일정이 배치될 그리드 행 번호
                                  const gridRow = globalContinuousSchedules.get(tag.id) || 1;

                                  /**
                                   * 연속 일정의 시각적 연결을 위한 스타일 설정
                                   * 시작일: 왼쪽 둥근 모서리
                                   * 중간일: 직사각형 모양
                                   * 종료일: 오른쪽 둥근 모서리
                                   */
                                  let containerStyle = "flex h-4 items-center";

                                  if (isFirstDay) {
                                    containerStyle += " w-[calc(100%)] -mr-4 rounded-l-[4px]";
                                  } else if (isLastDay) {
                                    containerStyle += " w-[calc(100%+4px)] -ml-1 rounded-r-[4px]";
                                  } else if (isMiddleDay) {
                                    containerStyle += " w-[calc(100%+4px)] -mx-1";
                                  }

                                  return (
                                    <div key={tag.id} style={{ gridRow }} className={`${containerStyle} ${bgColor}`} />
                                  );
                                })}
                              </div>

                              {/* 연속 일정 제목 레이어 (최상위) */}
                              <div
                                className="pointer-events-none absolute top-0 left-0 grid w-full gap-1"
                                style={{
                                  gridTemplateRows: `repeat(${currentDayMaxRow}, 20px)`,
                                }}>
                                {continuousTags.map(tag => {
                                  const { textColor } = FATIGUE_TAG[tag.fatigue || "VERY_TIRED"];
                                  const currentDate = normalizeDate(date!);
                                  const isFirstDay = currentDate.getTime() === tag.startDate.getTime();
                                  const isLastDay = currentDate.getTime() === tag.endDate.getTime();
                                  const isSunday = date!.getDay() === 0; // 일요일인지 확인
                                  const gridRow = globalContinuousSchedules.get(tag.id) || 1;

                                  // 시작일이거나 일요일(주의 시작)인 경우에만 제목 표시
                                  // 단, 일요일이 종료일인 경우는 제외
                                  const shouldShowTitle =
                                    isFirstDay || (isSunday && currentDate > tag.startDate && !isLastDay);

                                  if (!shouldShowTitle) return null;

                                  return (
                                    <div
                                      key={`title-${tag.id}`}
                                      style={{ gridRow }}
                                      className="relative flex h-4 items-center">
                                      <p className={`absolute left-1 z-50 px-1 text-[10px] ${textColor} text-nowrap`}>
                                        {/* 토요일(6)이거나 달의 마지막 날인 경우 3글자만 표시, 아니면 전체 표시 */}
                                        {date!.getDay() === 6 || date!.getDate() === lastDate
                                          ? tag.title.slice(0, 3)
                                          : tag.title}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 단일 일정 및 기념일 스택 표시 */}
                          <div className="flex w-full flex-col gap-1">
                            {/* 기념일 표시 (고정된 노란색 스타일) */}
                            {dayAnniversaries.map((anniversary, index) => (
                              <div
                                key={`${anniversary.title}-${index}`}
                                className="flex h-4 w-full items-center rounded-[4px] bg-[rgb(255,232,117,0.6)]">
                                <p className="w-full truncate px-1 text-[10px] text-[#7B6901]">{anniversary.title}</p>
                              </div>
                            ))}

                            {/* 단일 일정 표시 (피로도에 따른 색상) */}
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
          });
        })()}
      </div>
    </div>
  );
};
