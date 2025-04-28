import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, DatePickerDrawer, Button, ProgressHeader } from "@/shared/ui";
import { formatDateKorean } from "@/shared/utils";

export const MilitaryDay: React.FC = () => {
  const [enlistmentDate, setEnlistmentDate] = useState<Date | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    if (enlistmentDate && dischargeDate) {
      navigate("/onboarding/couple-contact");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="군 복무 기간을 입력해주세요"
        highlight="복무 기간"
        subtitle="입대일과 전역일을 정확히 입력해주세요."
        progress={2 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/")}
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
      </div>

      <div className="p-4">
        <Button
          variant={enlistmentDate && dischargeDate ? "active" : "inactive"}
          disabled={!enlistmentDate || !dischargeDate}
          onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
};
