import grayCalendar from "@/assets/icons/grayCalendar.svg";
import { Button } from "@/shared/ui";

interface DateSelectorProps {
  date: string;
}

export const DateSelector = ({ date }: DateSelectorProps) => {
  const formatDate = (newDate: Date | string) => {
    const date = new Date(newDate);

    if (isNaN(date.getTime())) return "유효하지 않은 날짜";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <Button variant="calendar" size="xs" className="max-w-[112px]">
      <img src={grayCalendar} alt="날짜 선택" className="h-4.5 w-4.5" />
      {date ? formatDate(date) : formatDate(new Date())}
    </Button>
  );
};
