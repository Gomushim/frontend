import { DatePickerDrawer, DateSelector } from "@/shared/ui";

const handleDateConfirm = (date: Date) => {
  // setBirthday(formatDateKorean(date));
  console.log("date", date);
};

export const DateBottomSheet = () => {
  return (
    <DatePickerDrawer onConfirm={handleDateConfirm}>
      <DateSelector />
    </DatePickerDrawer>
  );
};
