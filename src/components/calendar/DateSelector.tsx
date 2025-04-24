import { Button } from "../ui/button";
import grayCalendar from "@/assets/icons/grayCalendar.svg";

const DateSelector = () => {
  return (
    <Button variant="calendar" size="xs" className="max-w-[112px]">
      <img src={grayCalendar} alt="날짜 선택" className="h-4.5 w-4.5" />
      2025.6.5
    </Button>
  );
};

export default DateSelector;
