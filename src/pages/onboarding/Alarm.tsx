import React from "react";
import { useNavigate } from "react-router";
import { ProgressHeader, Button } from "@/shared/ui/";
import { useOnboardingAlarmStore } from "@/stores/onboardingStore";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const { submitOnboarding, resetOnboarding, isLoading, error } = useOnboardingAlarmStore();

  const handleAlarmAccept = async () => {
    try {
      await submitOnboarding(true);
      navigate("/mainpage");
    } catch (error) {
      console.error("온보딩 처리 중 오류 발생:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await submitOnboarding(false);
      navigate("/mainpage");
    } catch (error) {
      console.error("온보딩 처리 중 오류 발생:", error);
    }
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
        <Button 
          variant="active" 
          onClick={handleAlarmAccept}
          disabled={isLoading}
        >
          {isLoading ? "처리 중..." : "알림을 받을게요"}
        </Button>
        <Button 
          variant="inactive" 
          onClick={handleSkip}
          disabled={isLoading}
        >
          {isLoading ? "처리 중..." : "건너뛰기"}
        </Button>
        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Alarm;
