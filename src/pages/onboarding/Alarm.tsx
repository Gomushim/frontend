import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui";
import { useOnboardingAlarmStore } from "@/features/onboarding/model/OnboardingStore";
import { onboardingQueries } from "@/entities/onboarding/service";
import axios from "axios";
import { ProgressHeader } from "@/shared/ui/progressheader";
import pushalarmJson from "@/assets/json/pushalarm.json";
import Lottie from "lottie-react";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const { 
    nickname, birthday, isAgeVisible, isGenderVisible, isLoading, error,
    setLoading, setError, setAlarmEnabled
  } = useOnboardingAlarmStore();

  const handleOnboarding = async (isNotification: boolean) => {
    setLoading(true);
    setError(null);
    try {
      if (!nickname || !birthday || !isAgeVisible || !isGenderVisible) {
        throw new Error("입력되지 않은 정보가 있어요");
      }
      const response = await onboardingQueries.postOnboarding({
        nickname,
        birthDate: birthday,
        fcmToken: "string",
        isNotification
      });
      
      if (response) {
        setAlarmEnabled(isNotification);
        navigate("/");
      }
    } catch (error) {
      console.error("온보딩 API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        console.log("에러 응답:", error.response);
        console.log("에러 상태:", error.response?.status);
        console.log("에러 데이터:", error.response?.data);
        
        if (error.response?.status === 401) {
          // 3초 후에 리다이렉트
          setTimeout(() => {
            const redirectUri = encodeURIComponent(`${window.location.origin}/onboarding/alarm`);
            window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
          }, 3000);
        } else {
          setError(error.response?.data?.message || "알 수 없는 오류가 발생했습니다.");
        }
      } else {
        setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white w-full max-w-[375px] mx-auto">
      <ProgressHeader
        title="멀리 있어도, 마음은 늘 가까이"
        highlight="마음은 늘 가까이"
        subtitle="문득 생각날 때, 당신의 마음을 전해드릴게요."
        progress={3 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/onboarding/nickname")}
      />
      <div className="flex-1 flex items-center justify-center -mt-40">
        <Lottie animationData={pushalarmJson} />
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-white p-4 space-y-3 z-10">
        <div
          className="w-full text-center text-gray-700 text-base font-medium text-sm pb-2 cursor-pointer underline underline-offset-3"
          onClick={() => !isLoading && handleOnboarding(false)}
        >
          건너뛰기
        </div>
        <Button 
          variant="active" 
          size="onicon" 
          onClick={() => handleOnboarding(true)}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "처리중..." : "알림을 받을게요"}
        </Button>
        {error && (
          <p className="mt-2 text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Alarm;
