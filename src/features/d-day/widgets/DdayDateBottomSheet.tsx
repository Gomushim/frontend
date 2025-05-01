import { useDdayStore } from "@/entities/d-day";
import { DatePickerDrawer, DateSelector } from "@/shared/ui";
import { useShallow } from "zustand/shallow";

export const DdayDateBottomSheet = () => {
  const { date, setDate } = useDdayStore(
    useShallow(state => ({
      date: state.dday.date,
      setDate: state.setDate,
    }))
  );

  const handleDateConfirm = (selectedDate: Date) => {
    const current = new Date(selectedDate);
    const isValidCurrent = !isNaN(current.getTime());

    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      isValidCurrent ? current.getHours() : 0,
      isValidCurrent ? current.getMinutes() : 0
    );

    setDate(newDate.toISOString());
  };

  return (
    <DatePickerDrawer onConfirm={handleDateConfirm}>
      <DateSelector date={date} />
    </DatePickerDrawer>
  );
};
