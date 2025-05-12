import { DateSelector } from "@/shared/ui";
import { DatePickerDrawer } from "@/widgets/datepicker/ui";

interface DateBottomSheetProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DateBottomSheet = ({ selectedDate, onDateChange }: DateBottomSheetProps) => {
  const handleDateConfirm = (selectedDate: Date) => {
    const current = new Date(selectedDate);
    const isValidCurrent = !isNaN(current.getTime());

    // 시간 추출
    const hours = isValidCurrent ? current.getHours() : 0;
    const minutes = isValidCurrent ? current.getMinutes() : 0;

    // UTC 기준으로 시간 설정
    const newDate = new Date(
      Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hours, minutes)
    );

    onDateChange(newDate.toISOString());
  };

  return (
    <DatePickerDrawer onConfirm={handleDateConfirm}>
      <DateSelector date={selectedDate} />
    </DatePickerDrawer>
  );
};
