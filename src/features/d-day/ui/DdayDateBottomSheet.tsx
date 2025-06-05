import { DateSelector } from "@/shared/ui";
import { DatePickerSheet } from "@/widgets/datepicker/ui";

interface DdayDateBottomSheetProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DdayDateBottomSheet = ({ selectedDate, onDateChange }: DdayDateBottomSheetProps) => {
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
    onDateChange(formatted);
  };

  return (
    <DatePickerSheet onConfirm={handleDateConfirm}>
      <DateSelector date={selectedDate} />
    </DatePickerSheet>
  );
};
