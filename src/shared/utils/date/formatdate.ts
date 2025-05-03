export const formatDateDot = (newDate: Date | string): string => {
  // 문자열이면 마이크로초 제거 (6자리 초과 부분 잘라냄)
  const cleanDateStr = typeof newDate === "string" ? newDate.replace(/\.\d{6}/, "") : newDate;

  const date = new Date(cleanDateStr);
  if (isNaN(date.getTime())) return ""; // 날짜 파싱 실패 방지

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
};

export const formatDateFull = (newDate: Date | string) => {
  const date = new Date(newDate);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};

export const formatDateKorean = (date: Date): string => {
  // 2025년 06월 05일
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

export const formatDateKoreanWithWeekday = (date: Date): string => {
  // 2025년 06월 05일 금요일
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weekday = weekdays[date.getDay()];
  return `${year}년 ${month}월 ${day}일 ${weekday}`;
};

// 2025년 06월
export const formatYearMonth = (year: number, month: number) => `${year}년 ${month}월`;
