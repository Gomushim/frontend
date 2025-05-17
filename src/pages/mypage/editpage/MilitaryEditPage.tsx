import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, DatePickerDrawer, Button } from "@/shared/ui";
import { formatDateKorean, formatSimpleDate } from "@/shared/utils";
import { EditHeader } from "@/features/mypage";
import { useUpdateMilitaryDate } from "@/entities/edit_info/mutation";
import { DatePickerDrawer } from "@/widgets/datepicker/ui";

export const MilitaryEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [enlistmentDate, setEnlistmentDate] = useState<Date | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const { mutate: updateMilitaryDate } = useUpdateMilitaryDate();

  const handleNext = () => {
    if (!enlistmentDate || !dischargeDate) {
      setError("입력되지 않은 정보가 있어요");
      return;
    }

    // 날짜 유효성 검사
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (enlistmentDate > today) {
      setError("입대일은 오늘보다 이전이어야 합니다");
      return;
    }

    if (dischargeDate <= enlistmentDate) {
      setError("전역일은 입대일보다 이후여야 합니다");
      return;
    }

    setError(null);
    updateMilitaryDate(
      { 
        militaryStartDate: formatSimpleDate(enlistmentDate),
        militaryEndDate: formatSimpleDate(dischargeDate)
      },
      {
        onSuccess: () => {
          navigate("/mypage/profileinfo");
        },
      }
    );
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <EditHeader
        title="군 복무 기간을 입력해주세요"
        highlight="복무 기간"
        subtitle="입대일과 전역일을 정확히 입력해주세요."
        onBack={() => navigate("/mypage/profileinfo")}
      />

      <div className="flex-1 px-4">
        <div className="mt-4 space-y-6">
          <div>
            <label className="text-gray-1000 text-md mb-2 block font-medium">입대일</label>
            <DatePickerDrawer onConfirm={setEnlistmentDate}>
              <Input
                value={enlistmentDate ? formatDateKorean(enlistmentDate) : ""}
                onChange={() => {}}
                placeholder="입대일을 선택해주세요."
                status={enlistmentDate ? "active" : "inactive"}
                onClear={() => setEnlistmentDate(null)}
              />
            </DatePickerDrawer>
          </div>

          <div>
            <label className="text-gray-1000 text-md mb-2 block font-medium">전역일</label>
            <DatePickerDrawer onConfirm={setDischargeDate}>
              <Input
                value={dischargeDate ? formatDateKorean(dischargeDate) : ""}
                onChange={() => {}}
                placeholder="전역일을 선택해주세요."
                status={dischargeDate ? "active" : "inactive"}
                onClear={() => setDischargeDate(null)}
              />
            </DatePickerDrawer>
          </div>
        </div>
        {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
      </div>

      <div className="p-4">
        <Button
          variant={enlistmentDate && dischargeDate ? "active" : "inactive"}
          disabled={!enlistmentDate || !dischargeDate}
          onClick={handleNext}
          size="onicon">
          저장
        </Button>
      </div>
    </div>
  );
};
