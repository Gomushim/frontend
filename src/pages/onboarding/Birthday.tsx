import React from "react";
import { useNavigate } from "react-router";
import { Button, ProgressHeader, Input, Checkbox } from "@/shared/ui";
import { useOnboardingAlarmStore } from "@/features/onboarding/model/OnboardingStore";
import { formatDateKorean } from "@/shared/utils";
import { DatePickerDrawer } from "@/widgets/datepicker/ui/datepicker";

export const Birthday: React.FC = () => {
  const navigate = useNavigate();
  const { birthday, isAgeVisible, isGenderVisible, setBirthday, setAgeVisible, setGenderVisible, isLoading, error } =
    useOnboardingAlarmStore();

  const handleSubmit = async () => {
    if (birthday && isAgeVisible && isGenderVisible) {
      try {
        const birthDate = new Date(birthday);
        const today = new Date();
        if (birthDate > today) {
          throw new Error("생년월일은 오늘 이전 날짜여야 합니다.");
        }
        navigate("/onboarding/alarm");
      } catch (error) {
        console.error("생년월일 처리 중 오류 발생:", error);
      }
    }
  };

  const handleDateConfirm = (date: Date) => {
    setBirthday(formatDateKorean(date));
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="생년월일을 선택해주세요"
        highlight="생년월일"
        subtitle="생일에 상대방에게 알림을 줄게요!"
        progress={2 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/onboarding/nickname")}
      />

      <div className="flex-1 px-4">
        <div className="mt-4">
          <DatePickerDrawer onConfirm={handleDateConfirm}>
            <Input value={birthday} placeholder="날짜를 선택해주세요." onChange={() => {}} readOnly />
          </DatePickerDrawer>
        </div>

        <div className="mt-17 ml-2 space-y-4">
          <label className="flex items-center space-x-2">
            <Checkbox checked={isAgeVisible} onCheckedChange={checked => setAgeVisible(checked as boolean)} />
            <span className="text-md text-medium text-gray-900">이용자간 동의(필수)</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox checked={isGenderVisible} onCheckedChange={checked => setGenderVisible(checked as boolean)} />
            <span className="text-md text-medium text-gray-900">개인정보 수집/이용 동의(필수)</span>
          </label>
        </div>
        {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
      </div>

      <div className="p-4">
        <Button
          variant={birthday && isAgeVisible && isGenderVisible ? "active" : "inactive"}
          onClick={handleSubmit}
          disabled={!birthday || !(isAgeVisible && isGenderVisible) || isLoading}
          size="onicon">
다음        </Button>
      </div>
    </div>
  );
};
