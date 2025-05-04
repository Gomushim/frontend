import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, DatePickerDrawer} from "@/shared/ui";
import { formatDateKorean } from "@/shared/utils";
import { EditHeader } from "@/features/mypage";

export const FirstMeetEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [firstMeetDate, setFirstMeetDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!firstMeetDate) {
      setError("날짜를 선택해주세요");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (firstMeetDate > today) {
      setError("만난 날짜는 오늘보다 이전이어야 합니다");
      return;
    }

    setError(null);
    navigate("/mypage/profileinfo");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-0">
      <EditHeader
       title="연인과 처음 만난 날은 언제인가요?"
       highlight="처음 만난 날"
       subtitle="두 분의 첫 만남을 기록해주세요."
        onBack={() => navigate("/mypage/profileinfo")}
      />

      <div className="mt-6 flex-1 px-4">
        <DatePickerDrawer onConfirm={setFirstMeetDate}>
          <Input
            value={firstMeetDate ? formatDateKorean(firstMeetDate) : ""}
            placeholder="날짜를 선택해주세요."
            status={firstMeetDate ? "active" : "inactive"}
            onClear={() => setFirstMeetDate(null)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </DatePickerDrawer>
        {error && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}
      </div>

      <div className="p-4">
        <Button 
          variant={firstMeetDate ? "active" : "inactive"} 
          size="onicon" 
          disabled={!firstMeetDate} 
          onClick={handleNext}
        >
          완료
        </Button>
      </div>
    </div>
  );
};
