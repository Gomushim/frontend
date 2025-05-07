import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "@/shared/ui";
import { formatDateKorean, formatDateDot } from "@/shared/utils";
import { EditHeader } from "@/features/mypage";
import { useUpdateMyBirthDate } from "@/entities/edit_info/mutation";
import { DatePickerDrawer } from "@/widgets/datepicker/ui";

export const BirthdayEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { mutate: updateBirthDate } = useUpdateMyBirthDate();

  const handleSubmit = () => {
    if (!selectedDate) return;

    const formattedDate = formatDateDot(selectedDate).replace(/\. /g, "-").replace(".", "");

    updateBirthDate(
      { birthDate: formattedDate },
      {
        onSuccess: () => {
          navigate("/mypage/profileinfo");
        },
      }
    );
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
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
              value={selectedDate ? formatDateKorean(selectedDate) : ""}
              placeholder="날짜를 선택해주세요."
              onChange={() => {}}
            />
          </DatePickerDrawer>
        </div>
      </div>

      <div className="p-4">
        <Button
          variant={selectedDate ? "active" : "inactive"}
          onClick={handleSubmit}
          disabled={!selectedDate}
          size="onicon">
          저장
        </Button>
      </div>
    </div>
  );
};
