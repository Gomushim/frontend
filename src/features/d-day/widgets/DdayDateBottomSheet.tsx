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
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, "0");
    const dd = String(newDate.getDate()).padStart(2, "0");

    const formatted = `${yyyy}-${mm}-${dd}`;
    setDate(formatted);
  };

  return (
    <DatePickerDrawer onConfirm={handleDateConfirm}>
      <DateSelector date={date} />
    </DatePickerDrawer>
  );
};
