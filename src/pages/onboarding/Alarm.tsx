import React from "react";
import { useNavigate } from "react-router";
import { ProgressHeader, Button } from "@/shared/ui/";
import { useOnboardingAlarmStore } from "@/stores/onboardingStore";
import { postOnboarding } from "@/api/onboarding";
import axios, { AxiosError } from "axios";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const { nickname, birthday, isAgeVisible, isGenderVisible, setAlarmEnabled, resetOnboarding } =
    useOnboardingAlarmStore();

  const handleAlarmAccept = async () => {
    console.log("알림 수신 버튼 클릭됨");
    try {
      console.log("API 요청 데이터:", {
        nickname,
        birthDate: birthday,
        fcmToken: "string",
        isNotification: true,
      });

      const response = await postOnboarding({
        nickname,
        birthDate: birthday,
        fcmToken: "string",
        isNotification: true,
      });

      console.log("API 응답:", response);
      setAlarmEnabled(true);

      // 리다이렉트를 막고 콘솔 확인을 위해 alert 사용
      alert("API 응답을 확인하세요. 확인 버튼을 누르면 메인 페이지로 이동합니다.");
      navigate("/mainpage");
    } catch (error) {
      console.error("온보딩 API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        // 카카오 로그인 페이지로 리다이렉트
        const redirectUri = encodeURIComponent(`${window.location.origin}/onboarding/alarm`);
        alert("API 에러를 확인하세요. 확인 버튼을 누르면 카카오 로그인 페이지로 이동합니다.");
        window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
      }
    }
  };

  const handleSkip = async () => {
    console.log("건너뛰기 버튼 클릭됨");
    try {
      console.log("API 요청 데이터:", {
        nickname,
        birthDate: birthday,
        fcmToken: "string",
        isNotification: false,
      });

      const response = await postOnboarding({
        nickname,
        birthDate: birthday,
        fcmToken: "string",
        isNotification: false,
      });

      console.log("API 응답:", response);
      setAlarmEnabled(false);

      // 리다이렉트를 막고 콘솔 확인을 위해 alert 사용
      alert("API 응답을 확인하세요. 확인 버튼을 누르면 메인 페이지로 이동합니다.");
      navigate("/mainpage");
    } catch (error) {
      console.error("온보딩 API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        // 카카오 로그인 페이지로 리다이렉트
        const redirectUri = encodeURIComponent(`${window.location.origin}/onboarding/alarm`);
        alert("API 에러를 확인하세요. 확인 버튼을 누르면 카카오 로그인 페이지로 이동합니다.");
        window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
      }
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

      <div className="space-y-2 p-4">
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
