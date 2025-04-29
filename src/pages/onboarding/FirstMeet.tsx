import React from "react";
import { useNavigate } from "react-router";
import { Button, Input, DatePickerDrawer, ProgressHeader } from "@/shared/ui";
import { useOnboardingStore } from "@/stores/maonboardingStore";
import { formatDateKorean } from "@/shared/utils";

export const FirstMeet: React.FC = () => {
  const navigate = useNavigate();
  const { firstMeetDate, setFirstMeetDate } = useOnboardingStore();

  const handleNext = () => {
    if (firstMeetDate) {
      navigate("/onboarding/where");
    }
  };

  const handleDateConfirm = (date: Date) => {
    setFirstMeetDate(date);
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
            value={firstMeetDate ? formatDateKorean(firstMeetDate) : ""}
            placeholder="날짜를 선택해주세요."
            status={firstMeetDate ? "active" : "inactive"}
            onClear={() => {
              setFirstMeetDate(null);
            }}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </DatePickerDrawer>
      </div>

      <div className="p-4">
        <Button variant={firstMeetDate ? "active" : "inactive"} disabled={!firstMeetDate} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
