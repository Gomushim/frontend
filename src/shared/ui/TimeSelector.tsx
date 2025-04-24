import { Button } from "@/shared/ui";
import grayClock from "@/assets/icons/grayClock.svg";

export const TimeSelector = () => {
  return (
    <Button variant="calendar" size="xs" className="">
      <img src={grayClock} alt="시간 선택" className="h-5 w-5" />
      오후 5:00
    </Button>
  );
};
