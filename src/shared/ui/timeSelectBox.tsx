import { Button } from "@/shared/ui";
import grayClock from "@/assets/icons/grayClock.svg";
interface TimeSelectorProps {
  time: string;
}

export const TimeSelector = ({ time }: TimeSelectorProps) => {
  // 전역 상태에서 startDate와 setStartDate를 불러옵니다.

  const formatTime = (date: Date | null) => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 오전/오후 판별
    const ampm = hours >= 12 ? "오후" : "오전";

    // 오후 12시 처리: 12시 그대로 사용
    const formattedHour = hours % 12 || 12; // 12시간제로 변환
    const formattedMinute = String(minutes).padStart(2, "0");

    // 오전/오후에 맞춰 출력
    return `${ampm} ${formattedHour}:${formattedMinute}`;
  };

  return (
    <Button variant="calendar" size="xs">
      <img src={grayClock} alt="시간 선택" className="h-5 w-5" />
      {formatTime(time ? new Date(time) : new Date())}
    </Button>
  );
};
