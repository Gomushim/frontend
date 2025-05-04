import { useScheduleStore } from "@/entities/schedule";
import { DatePickerDrawer, DateSelector } from "@/shared/ui";
import { useShallow } from "zustand/shallow";

interface DateBottomSheetProps {
  type: "start" | "end";
}

export const DateBottomSheet = ({ type }: DateBottomSheetProps) => {
  const { startDate, endDate, setStartDate, setEndDate } = useScheduleStore(
    useShallow(state => ({
      isAllDay: state.schedule.isAllDay,
      startDate: state.schedule.startDate,
      endDate: state.schedule.endDate,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
    }))
  );

  const handleDateConfirm = (selectedDate: Date) => {
    const current = type === "start" ? new Date(startDate) : new Date(endDate);
    const isValidCurrent = !isNaN(current.getTime());

    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      isValidCurrent ? current.getHours() : 0,
      isValidCurrent ? current.getMinutes() : 0
    );

    if (type === "start") {
      setStartDate(newDate.toISOString());
    } else {
      setEndDate(newDate.toISOString());
    }
  };

  return (
    <DatePickerDrawer onConfirm={handleDateConfirm}>
      <DateSelector date={type === "start" ? startDate : endDate} />
    </DatePickerDrawer>
  );
};
