import React from "react";
import { Button, ProgressHeader } from "@/shared/ui";
import { useOnboardingStore, MilitaryBranch } from "@/stores/maonboardingStore";
import { useNavigate } from "react-router";

export const Where: React.FC = () => {
  const { militaryBranch, setMilitaryBranch } = useOnboardingStore();
  const navigate = useNavigate();

  const locations = [
    { id: "ARMY", label: "육군" },
    { id: "NAVY", label: "해군" },
    { id: "AIR_FORCE", label: "공군" },
    { id: "MARINE", label: "해병대" },
  ];

  const handleLocationSelect = (location: MilitaryBranch) => {
    setMilitaryBranch(location);
  };

  const handleNext = () => {
    if (militaryBranch) {
      navigate("/onboarding/military-day");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ProgressHeader
        title="어느 군에서 복무중이신가요?"
        highlight="어느 군"
        subtitle="나 또는 상대의 소속을 선택해주세요."
        progress={0.4}
      />

      <div className="mt-6 space-y-2 px-4">
        {locations.map(location => (
          <button
            key={location.id}
            className={`text-medium text-regular w-full rounded-xl border bg-gray-50 p-4 text-left ${
              militaryBranch === location.id ? "border-green-500" : "border-gray-50"
            }`}
            onClick={() => handleLocationSelect(location.id as MilitaryBranch)}>
            {location.label}
          </button>
        ))}
      </div>

      <div className="fixed right-0 bottom-0 left-0 p-4">
        <Button variant={militaryBranch ? "active" : "inactive"} disabled={!militaryBranch} onClick={handleNext}>
          확인
        </Button>
      </div>
    </div>
  );
};
