export const getShiftedWeekdays = (today: Date = new Date()) => {
  const baseDays = ["일", "월", "화", "수", "목", "금", "토"];
  const todayDayIndex = today.getDay();
  const shiftCount = (todayDayIndex - 1 + 7) % 7;
  return [...baseDays.slice(shiftCount), ...baseDays.slice(0, shiftCount)];
};

export const getDateList = (baseDate: Date = new Date(), daysToShow: number = 7, offsetBefore: number = 1) => {
  const startDate = new Date(baseDate);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(baseDate.getDate() - offsetBefore);

  const dateList: Date[] = [];
  for (let i = 0; i < daysToShow; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    dateList.push(d);
  }
  return dateList;
};
