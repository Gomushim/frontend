import { TimeSelector } from "@/shared/ui";
import { toLocalISOString } from "@/shared/utils/time/format";
import { TimePickerDrawer } from "@/widgets/timepicker/ui";

interface TimeBottomSheetProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  isAllDay: boolean;
}

export const TimeBottomSheet = ({ selectedDate, onDateChange, isAllDay }: TimeBottomSheetProps) => {
  const handleTimeConfirm = (time: { ampm: string; hour: string; minute: string }) => {
    const { ampm, hour, minute } = time;
    const hourNum = parseInt(hour, 10);
    const minuteNum = parseInt(minute, 10);

    let newHour = hourNum;
    if (ampm === "오후" && hourNum !== 12) newHour += 12;
    if (ampm === "오전" && hourNum === 12) newHour = 0;

    const base = selectedDate ? new Date(selectedDate) : new Date();
    const updated = new Date(base.getFullYear(), base.getMonth(), base.getDate(), newHour, minuteNum, 0, 0);

    const localISOString = toLocalISOString(updated);
    onDateChange(localISOString);
  };

  return (
    <TimePickerDrawer onConfirm={handleTimeConfirm}>
      <TimeSelector time={selectedDate} deactivate={isAllDay} />
    </TimePickerDrawer>
  );
};
