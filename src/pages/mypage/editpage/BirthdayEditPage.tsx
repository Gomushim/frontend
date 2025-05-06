import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, DatePickerDrawer } from "@/shared/ui";
import { formatDateKorean } from "@/shared/utils";
import { EditHeader } from "@/features/mypage";

export const BirthdayEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [birthday, setBirthday] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (birthday) {
      try {
        const birthDate = new Date(birthday);
        const today = new Date();
        if (birthDate > today) {
          throw new Error("생년월일은 오늘 이전 날짜여야 합니다.");
        }
        navigate("/mypage/profileinfo");
      } catch (error) {
        console.error("생년월일 처리 중 오류 발생:", error);
        setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleDateConfirm = (date: Date) => {
    setBirthday(formatDateKorean(date));
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <EditHeader
        title="생년월일을 선택해주세요"
        subtitle="생일에 상대에게 알림을 줄게요!"
        highlight="생년월일"
        onBack={() => navigate("/mypage/profileinfo")}
      />

      <div className="flex-1 px-4">
        <div className="mt-8">
          <DatePickerDrawer onConfirm={handleDateConfirm}>
            <Input 
              value={birthday} 
              placeholder="날짜를 선택해주세요." 
              onChange={() => {}} 
            />
          </DatePickerDrawer>
        </div>
        {error && (
          <p className="text-red-500 text-center text-sm mt-4">{error}</p>
        )}
      </div>

      <div className="p-4">
        <Button
          variant={birthday ? "active" : "inactive"}
          onClick={handleSubmit}
          disabled={!birthday}
          size="onicon"
         />
      </div>
    </div>
  );
};
