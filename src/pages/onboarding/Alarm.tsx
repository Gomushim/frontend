import React from "react";
import { useNavigate } from "react-router";
import { ProgressHeader, Button } from "@/shared/ui/";
import { useOnboardingAlarmStore } from "@/store/onboardingAlarmStore";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const { setAlarmEnabled, resetOnboarding } = useOnboardingAlarmStore();

  const handleAlarmAccept = () => {
    setAlarmEnabled(true);
    navigate("/");
  };

  const handleSkip = () => {
    setAlarmEnabled(false);
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="멀리 있어도, 마음은 늘 가까이"
        highlight="마음은 늘 가까이"
        subtitle="문득 생각날 때, 당신의 마음을 전해드릴게요."
        progress={1}
        onBack={() => navigate(-1)}
        onClose={() => {
          resetOnboarding();
          navigate("/");
        }}
      />

      <div className="flex-1" />

      <div className="p-4 space-y-2">
        <Button variant="active" onClick={handleAlarmAccept}>
          알림을 받을게요
        </Button>
        <Button variant="inactive" onClick={handleSkip}>
          건너뛰기
        </Button>
      </div>
    </div>
  );
};

export default Alarm;
