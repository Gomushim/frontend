import { useScheduleStore } from "@/entities/schedule";
import { DateSelector } from "@/shared/ui";
import { DatePickerDrawer } from "@/widgets/datepicker/ui";
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

    // 시간 추출
    const hours = isValidCurrent ? current.getHours() : 0;
    const minutes = isValidCurrent ? current.getMinutes() : 0;

    // UTC 기준으로 시간 설정
    const newDate = new Date(
      Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hours, minutes)
    );
    console.log(newDate.toISOString());
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
