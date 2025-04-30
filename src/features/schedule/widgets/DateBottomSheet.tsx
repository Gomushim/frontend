import { DatePickerDrawer, DateSelector } from "@/shared/ui";

const handleDateConfirm = (date: Date) => {
  // setBirthday(formatDateKorean(date));
};

export const DateBottomSheet = () => {
  return (
    <DatePickerDrawer onConfirm={handleDateConfirm}>
      <DateSelector />
    </DatePickerDrawer>
  );
};
