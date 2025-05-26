import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui";
import { useOnboardingAlarmStore } from "@/features/onboarding/model/OnboardingStore";
import { onboardingQueries } from "@/entities/onboarding/service";
import axios from "axios";
import { ProgressHeader } from "@/shared/ui/progressheader";
import pushalarmJson from "@/assets/json/pushalarm.json";
import Lottie from "lottie-react";
import { requestNotificationPermission } from "@/shared/firebase/setupFCM";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const { nickname, birthday, isAgeVisible, isGenderVisible, isLoading, error, setLoading, setError, setAlarmEnabled } =
    useOnboardingAlarmStore();

  const handleOnboarding = async (isNotification: boolean) => {
    setLoading(true);
    setError(null);

    try {
      if (!nickname || !birthday || !isAgeVisible || !isGenderVisible) {
        throw new Error("입력되지 않은 정보가 있어요");
      }

      const fcmToken = await requestNotificationPermission();

      const response = await onboardingQueries.postOnboarding({
        nickname,
        birthDate: birthday,
        fcmToken: fcmToken || "",
        isNotification,
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
    <div className="flex min-h-screen w-full flex-col bg-white">
      <ProgressHeader
        title="멀리 있어도, 마음은 늘 가까이"
        highlight="마음은 늘 가까이"
        subtitle="문득 생각날 때, 당신의 마음을 전해드릴게요."
        progress={3 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/onboarding/nickname")}
      />
      <div className="flex-1 flex items-center justify-center -mt-0">
        <Lottie animationData={pushalarmJson} />
      </div>
      <div className="p-4">
        <div
          className="w-full cursor-pointer pb-2 text-center text-base text-sm font-medium text-gray-700 underline underline-offset-3"
          onClick={() => !isLoading && handleOnboarding(false)}>
          건너뛰기
        </div>
        <Button
          variant="active"
          size="onicon"
          onClick={() => handleOnboarding(true)}
          disabled={isLoading}
          className="w-full">
          {isLoading ? "처리중..." : "알림을 받을게요"}
        </Button>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Alarm;
