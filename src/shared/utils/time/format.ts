export const formatTimeFromString = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Date 객체를 로컬 ISO 문자열(타임존 없는 문자열)로 변환
const pad = (n: number) => n.toString().padStart(2, "0");
export const toLocalISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

// Date 객체를 "오전/오후 HH:MM" 형식으로 포맷
export const formatTimeWithAmPm = (date: Date | null): string => {
  if (!date) return "";
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHour = hours % 12 || 12;
  const formattedMinute = String(minutes).padStart(2, "0");

  return `${ampm} ${formattedHour}:${formattedMinute}`;
};
