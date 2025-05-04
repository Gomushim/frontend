import { useScheduleStore } from "@/entities/schedule";
import { TimePickerDrawer, TimeSelector } from "@/shared/ui";
import { toLocalISOString } from "@/shared/utils/time/format";
import { useShallow } from "zustand/shallow";

interface TimeBottomSheetProps {
  target: "start" | "end" | "dday";
}

export const TimeBottomSheet = ({ target }: TimeBottomSheetProps) => {
  const { setStartDate, setEndDate, isAllDay, startDate, endDate } = useScheduleStore(
    useShallow(state => ({
      isAllDay: state.schedule.isAllDay,
      startDate: state.schedule.startDate,
      endDate: state.schedule.endDate,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
    }))
  );

  const handleTimeConfirm = (time: { ampm: string; hour: string; minute: string }) => {
    const { ampm, hour, minute } = time;
    const hourNum = parseInt(hour, 10);
    const minuteNum = parseInt(minute, 10);

    let newHour = hourNum;
    if (ampm === "오후" && hourNum !== 12) newHour += 12;
    if (ampm === "오전" && hourNum === 12) newHour = 0;

    const rawDate = target === "start" ? startDate : endDate;
    const base = rawDate ? new Date(rawDate) : new Date();
    const updated = new Date(base.getFullYear(), base.getMonth(), base.getDate(), newHour, minuteNum, 0, 0);

    const localISOString = toLocalISOString(updated);

    return target === "start" ? setStartDate(localISOString) : setEndDate(localISOString);
  };

  return (
    <TimePickerDrawer onConfirm={handleTimeConfirm}>
      <TimeSelector time={target === "start" ? startDate : endDate} deactivate={isAllDay} />
    </TimePickerDrawer>
  );
};
