import { useScheduleStore } from "@/entities/schedule";
import { TimePickerDrawer, TimeSelector } from "@/shared/ui";
import { useShallow } from "zustand/shallow";

interface TimeBottomSheetProps {
  target: "start" | "end";
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
    const hourNum = parseInt(hour);
    const minuteNum = parseInt(minute);
    let newHour = hourNum;

    if (ampm === "오후" && hourNum !== 12) newHour += 12;
    if (ampm === "오전" && hourNum === 12) newHour = 0;

    const rawDate = target === "start" ? startDate : endDate;
    const base = new Date(rawDate || Date.now()); // fallback 추가
    const updated = new Date(base);
    updated.setHours(newHour, minuteNum, 0, 0);

    const isoString = updated.toISOString();
    return target === "start" ? setStartDate(isoString) : setEndDate(isoString);
  };

  return (
    <TimePickerDrawer onConfirm={handleTimeConfirm}>
      <TimeSelector time={target === "start" ? startDate : endDate} deactivate={isAllDay} />
    </TimePickerDrawer>
  );
};
