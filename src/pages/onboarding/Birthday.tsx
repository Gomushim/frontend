import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, ProgressHeader, Input, Checkbox, DatePickerDrawer } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date/formatdate";

export const Birthday: React.FC = () => {
  const [birthday, setBirthday] = useState("");
  const [isAgeVisible, setIsAgeVisible] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (birthday) {
      navigate("/onboarding/alarm");
    }
  };

  const handleDateConfirm = (date: Date) => {
    setBirthday(formatDate(date));
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="생년월일을 선택해주세요"
        highlight="생년월일"
        subtitle="생일에 상대방에게 알림을 줄게요!"
        progress={2 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/")}
      />

      <div className="flex-1 px-4">
        <div className="mt-4">
          <DatePickerDrawer onConfirm={handleDateConfirm}>
            <Input value={birthday} placeholder="날짜를 선택해주세요." onChange={() => {}} />
          </DatePickerDrawer>
        </div>

        <div className="mt-17 ml-2 space-y-4">
          <label className="flex items-center space-x-2">
            <Checkbox checked={isAgeVisible} onCheckedChange={checked => setIsAgeVisible(checked as boolean)} />
            <span className="text-md text-medium text-gray-900">이용자간 동의(필수)</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox checked={isGenderVisible} onCheckedChange={checked => setIsGenderVisible(checked as boolean)} />
            <span className="text-md text-medium text-gray-900">개인정보 수집/이용 동의(필수)</span>
          </label>
        </div>
      </div>

      <div className="p-4">
        <Button
          variant={birthday && isAgeVisible && isGenderVisible ? "active" : "inactive"}
          onClick={handleSubmit}
          disabled={!birthday || !(isAgeVisible && isGenderVisible)}>
          다음
        </Button>
      </div>
    </div>
  );
};
