import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Input, Button, ProgressHeader } from "@/shared/ui";
import { useOnboardingStore } from "@/features/mainpage/model/InitSettingStore";
import { formatDateKorean, formatSimpleDate } from "@/shared/utils";
import { useInitSettingMutation, useInitSettingQueries } from "@/entities/init_setting";
import { DatePickerSheet } from "@/widgets/datepicker/ui";

export const MilitaryDay: React.FC = () => {
  const { militaryBranch, firstMeetDate, enlistmentDate, dischargeDate, setEnlistmentDate, setDischargeDate, resetOnboarding } =
    useOnboardingStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { getCoupleInfo } = useInitSettingQueries();
  const coupleId = getCoupleInfo.data?.result.coupleId ?? null;
  const { mutate: registerAnniversary, isPending } = useInitSettingMutation("post");

  useEffect(() => {
    if (getCoupleInfo.error) {
      console.error("커플 정보 조회 실패:", getCoupleInfo.error);
      setError("커플 정보를 가져오는데 실패했습니다.");
    }
  }, [getCoupleInfo.error]);

  const handleNext = async () => {
    if (!enlistmentDate || !dischargeDate || !firstMeetDate || !militaryBranch || !coupleId) {
      setError("입력되지 않은 정보가 있어요");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dischargeDate <= enlistmentDate) {
      setError("전역일은 입대일보다 이후여야 합니다");
      return;
    }

    setError(null);

    registerAnniversary(
      {
        coupleId,
        relationshipStartDate: formatSimpleDate(firstMeetDate),
        militaryStartDate: formatSimpleDate(enlistmentDate),
        militaryEndDate: formatSimpleDate(dischargeDate),
        military: militaryBranch as "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE",
      },
      {
        onSuccess: () => {
          navigate("/", { replace: true });
        },
        onError: error => {
          console.error("온보딩 완료 중 오류 발생:", error);
          setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="군 복무 기간을 입력해주세요"
        highlight="복무 기간"
        subtitle="입대일과 전역일을 정확히 입력해주세요."
        progress={3 / 3}
        onBack={() => navigate(-1)}
        onClose={() => {
          resetOnboarding(); 
          navigate("/");}}
      />

      <div className="flex-1 px-4">
        <div className="mt-4 space-y-6">
          <div>
            <label className="text-gray-1000 text-md mb-2 block font-medium">입대일</label>
            <DatePickerSheet onConfirm={setEnlistmentDate}>
              <Input
                value={enlistmentDate ? formatDateKorean(enlistmentDate) : ""}
                onChange={() => {}}
                placeholder="입대일을 선택해주세요."
                status={enlistmentDate ? "active" : "inactive"}
                onClear={() => setEnlistmentDate(null)} readOnly
              />
            </DatePickerSheet>
          </div>

          <div>
            <label className="text-gray-1000 text-md mb-2 block font-medium">전역일</label>
            <DatePickerSheet onConfirm={setDischargeDate}>
              <Input
                value={dischargeDate ? formatDateKorean(dischargeDate) : ""}
                onChange={() => {}}
                placeholder="전역일을 선택해주세요."
                status={dischargeDate ? "active" : "inactive"}
                onClear={() => setDischargeDate(null)} readOnly
              />
            </DatePickerSheet>
          </div>
        </div>
      </div>

      <div className="p-4">
        {error && <p className="mb-2 text-center text-sm text-red-0">{error}</p>}
        <Button
          variant={enlistmentDate && dischargeDate ? "active" : "inactive"}
          disabled={!enlistmentDate || !dischargeDate || isPending}
          onClick={handleNext}
          size="onicon">
           다음
        </Button>
      </div>
    </div>
  );
};