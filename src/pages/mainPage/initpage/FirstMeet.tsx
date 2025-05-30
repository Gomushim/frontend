import React from "react";
import { useNavigate } from "react-router";
import { Button, Input, ProgressHeader } from "@/shared/ui";
import { useOnboardingStore } from "@/features/mainpage/model/InitSettingStore";
import { formatDateKorean } from "@/shared/utils";
import { DatePickerSheet } from "@/widgets/datepicker/ui";

export const FirstMeet: React.FC = () => {
  const navigate = useNavigate();
  const { firstMeetDate, setFirstMeetDate,resetOnboarding } = useOnboardingStore();

  const handleNext = () => {
    if (firstMeetDate) {
      navigate("/onboarding/where");
    }
  };

  const handleDateConfirm = (date: Date) => {
    setFirstMeetDate(date);
  };

  return (
    <div className="flex h-screen flex-col bg-white pt-11">
      <ProgressHeader
        title="연인과 처음 만난 날은 언제인가요?"
        highlight="처음 만난 날"
        subtitle="두 분의 첫 만남을 기록해주세요."
        progress={1 / 3}
        onBack={() => navigate(-1)}
        onClose={() => { resetOnboarding(); 
          navigate("/");}
        }
      />

      <div className="mt-6 flex-1 px-4">
        <DatePickerSheet onConfirm={handleDateConfirm}>
          <Input
            value={firstMeetDate ? formatDateKorean(firstMeetDate) : ""}
            placeholder="날짜를 선택해주세요."
            status={firstMeetDate ? "active" : "inactive"}
            onClear={() => {
              setFirstMeetDate(null);
            }} readOnly
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </DatePickerSheet>
      </div>

      <div className="p-4">
        <Button
          variant={firstMeetDate ? "active" : "inactive"}
          size="onicon"
          disabled={!firstMeetDate}
          onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
