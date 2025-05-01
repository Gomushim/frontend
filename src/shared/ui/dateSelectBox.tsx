import grayCalendar from "@/assets/icons/grayCalendar.svg";
import balckCalendar from "@/assets/images/calendar_black.svg";
import { Button } from "@/shared/ui";

interface DateSelectorProps {
  date: string;
  deactivate?: boolean;
}

export const DateSelector = ({ date, deactivate }: DateSelectorProps) => {
  const formatDate = (newDate: Date | string) => {
    const date = new Date(newDate);

    if (isNaN(date.getTime())) return "유효하지 않은 날짜";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const textColor = date && !deactivate ? "text-gray-900" : "text-gray-400";

  return (
    <Button variant="calendar" size="xs" className={` ${textColor}`}>
      <img src={date && !deactivate ? balckCalendar : grayCalendar} alt="날짜 선택" className="h-5 w-5 pb-0.5" />
      {date && !deactivate ? formatDate(date) : formatDate(new Date())}
    </Button>
  );
};
