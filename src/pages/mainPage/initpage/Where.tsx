import React from "react";
import { Button, ProgressHeader } from "@/shared/ui";
import { useOnboardingStore, MilitaryBranch } from "@/features/mainpage/model/InitSettingStore";
import { useNavigate } from "react-router";

export const Where: React.FC = () => {
  const { militaryBranch, setMilitaryBranch, resetOnboarding } = useOnboardingStore();
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
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="어느 군에서 복무중이신가요?"
        highlight="어느 군"
        subtitle="나 또는 상대의 소속을 선택해주세요."
        progress={2/3}
        onBack={() => navigate(-1)}
        onClose={() => {
          resetOnboarding(); 
          navigate("/");}}
      />

      <div className="flex-1 px-4">
        <div className="mt-4 space-y-2">
          {locations.map(location => (
            <div key={location.id}>
              <button
                className={`text-medium text-regular w-full rounded-xl border bg-gray-50 p-4 text-left ${
                  militaryBranch === location.id ? "border-green-500" : "border-gray-50"
                }`}
                onClick={() => handleLocationSelect(location.id as MilitaryBranch)}>
                {location.label}
              </button>
            </div>
          ))}
          <p className="text-sm font-medium text-gray-500 text-center mt-3" >
            부사관 및 장교 포함
          </p>
        </div>
      </div>

      <div className="p-4">
        <Button 
          variant={militaryBranch ? "active" : "inactive"} 
          size="onicon" 
          disabled={!militaryBranch} 
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
