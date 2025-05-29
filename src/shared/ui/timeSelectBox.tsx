import { Button } from "@/shared/ui";
import grayClock from "@/assets/icons/grayClock.svg";
import blackClock from "@/assets/icons/blackClock.svg";
import { formatTimeWithAmPm } from "../utils/time/format";
interface TimeSelectorProps {
  time: string;
  deactivate?: boolean;
}

export const TimeSelector = ({ time, deactivate }: TimeSelectorProps) => {
  const textColor = time && !deactivate ? "text-gray-900" : "text-gray-400";

  return (
    <Button variant="calendar" size="xs" className={`${textColor}`}>
      <img src={time && !deactivate ? blackClock : grayClock} alt="시간 선택" className="h-5 w-5" />
      {formatTimeWithAmPm(time && !deactivate ? new Date(time) : new Date())}
    </Button>
  );
};
