export function calculateDday(targetDate: Date): string {
  const today = new Date();

  // 시간, 분, 초, 밀리초 초기화해서 날짜만 비교
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

  const diff = Math.floor((target.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    // 미래 날짜
    return `D-${diff}`;
  } else if (diff === 0) {
    // 오늘
    return "D-Day";
  } else {
    // 과거 날짜
    return `D+${Math.abs(diff)}`;
  }
}
