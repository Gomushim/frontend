import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, DatePickerDrawer, ProgressHeader } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date/formatdate";

export const FirstMeet: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleNext = () => {
    if (selectedDate) {
      navigate("/onboarding/military-day");
    }
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-0">
      <ProgressHeader
        title="연인과 처음 만난 날은 언제인가요?"
        highlight="처음 만난 날"
        subtitle="두 분의 첫 만남을 기록해주세요."
        progress={1 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/")}
      />

      <div className="mt-6 flex-1 px-4">
        <DatePickerDrawer onConfirm={handleDateConfirm}>
          <Input
            value={selectedDate ? formatDate(selectedDate) : ""}
            placeholder="날짜를 선택해주세요."
            status={selectedDate ? "active" : "inactive"}
            onClear={() => {
              setSelectedDate(null);
            }}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </DatePickerDrawer>
      </div>

      <div className="p-4">
        <Button variant={selectedDate ? "active" : "inactive"} disabled={!selectedDate} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
