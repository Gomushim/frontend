export function calculateDday(targetDate: string): string {
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const targetObj = new Date(targetDate);
  if (isNaN(targetObj.getTime())) {
    return "Invalid Date";
  }

  const target = new Date(targetObj.getFullYear(), targetObj.getMonth(), targetObj.getDate());

  const diff = Math.floor((target.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    return `D-${diff}`;
  } else if (diff === 0) {
    return "D-Day";
  } else {
    return `D+${Math.abs(diff)}`;
  }
}
