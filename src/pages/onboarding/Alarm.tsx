import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/ui";
import CloseIcon from "@/assets/images/close.svg";
import { useOnboardingAlarmStore } from "@/stores/onboardingStore";
import { onboardingQueries } from "@/entities/onboarding/service";
import axios from "axios";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const { 
    nickname, birthday, isAgeVisible, isGenderVisible,isLoading, error,
    setLoading,setError,setAlarmEnabled
  } = useOnboardingAlarmStore();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!nickname || !birthday || !isAgeVisible || !isGenderVisible) {
        throw new Error("입력되지 않은 정보가 있어요");
      }

      await onboardingQueries.postOnboarding({
        nickname,
        birthDate: birthday,
        fcmToken: "string", 
        isNotification: true
      });

      setAlarmEnabled(true);
      navigate("/onboarding/where");
    } catch (error) {
      console.error("온보딩 API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        const redirectUri = encodeURIComponent(`${window.location.origin}/onboarding/alarm`);
        window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
      }
      setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="bg-white px-4 pt-6 pb-4">
        <div className="mb-3 flex items-center justify-end">
          <button onClick={() => navigate("/mainpage")}>
            <img src={CloseIcon} alt="닫기" className="h-6 w-6" />
          </button>
        </div>

        <h1 className="text-left text-3xl font-bold text-gray-900">
          <span className="text-green-500">알림 설정</span>을 진행해주세요
        </h1>
        <p className="text-md font-regular text-left text-gray-500">
          중요한 일정과 기념일을 놓치지 않도록<br/>알림을 설정해보세요!
        </p>
      </div>

      <div className="flex-1 px-6">
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-lg bg-gray-200">
            <span className="text-gray-400">그래픽 넣기</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Button 
          variant="special" 
          size="onicon" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "처리중..." : "다음으로"}
        </Button>
        {error && (
          <p className="mt-2 text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Alarm;
