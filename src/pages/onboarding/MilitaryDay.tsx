import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, DatePickerDrawer, Button, ProgressHeader } from "@/shared/ui";
import { useOnboardingStore } from "@/stores/maonboardingStore";
import { formatDateKorean } from "@/shared/utils";
import { maonboardingQueries } from "@/entities/maonboarding/service";
import { useCoupleStore } from "@/stores/coupleStore";

export const MilitaryDay: React.FC = () => {
  const { 
    militaryBranch,
    firstMeetDate,
    enlistmentDate, 
    dischargeDate, 
    setEnlistmentDate, 
    setDischargeDate 
  } = useOnboardingStore();
  const { setInitialized } = useCoupleStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (!enlistmentDate || !dischargeDate || !firstMeetDate || !militaryBranch) {
      setError("입력되지 않은 정보가 있어요");
      return;
    }

    // 날짜 유효성 검사
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (firstMeetDate > today) {
      setError("만난 날짜는 오늘보다 이전이어야 합니다");
      return;
    }

    if (enlistmentDate > today) {
      setError("입대일은 오늘보다 이전이어야 합니다");
      return;
    }

    if (dischargeDate > today) {
      setError("전역일은 오늘보다 이전이어야 합니다");
      return;
    }

    if (dischargeDate <= enlistmentDate) {
      setError("전역일은 입대일보다 이후여야 합니다");
      return;
    }
    if (enlistmentDate <= firstMeetDate) {
      setError("입대일은 만난 날짜보다 이후여야 합니다");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await maonboardingQueries.registerAnniversary({
        coupleId: 1, // TODO: 실제 coupleId를 가져오는 로직 필요
        relationshipStartDate: firstMeetDate.toISOString().split("T")[0],
        militaryStartDate: enlistmentDate.toISOString().split("T")[0],
        militaryEndDate: dischargeDate.toISOString().split("T")[0],
        military: militaryBranch as "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE",
      });
      
      if (response.result) {
        setInitialized(true);
        navigate("/mainpage");
      }
    } catch (error) {
      console.error("온보딩 완료 중 오류 발생:", error);
      setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
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
        {error && (
          <p className="mb-2 text-center text-sm text-red-500">{error}</p>
        )}
        <Button
          variant={enlistmentDate && dischargeDate ? "active" : "inactive"}
          disabled={!enlistmentDate || !dischargeDate || isSubmitting}
          onClick={handleNext}
          size="onicon">
          {isSubmitting ? "처리중..." : "다음"}
        </Button>
      </div>
    </div>
  );
};
