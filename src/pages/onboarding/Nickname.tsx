import React from "react";
import { useNavigate } from "react-router";
import { Input, Button, ProgressHeader } from "@/shared/ui";
import { useOnboardingAlarmStore } from "@/stores/onboardingStore";

export const Nickname: React.FC = () => {
  const navigate = useNavigate();
  const { nickname, setNickname, isLoading, error } = useOnboardingAlarmStore();

  const handleSubmit = async () => {
    if (nickname.trim()) {
      try {
        if (nickname.length > 3) {
          throw new Error("닉네임은 3글자 이내로 입력해주세요.");
        }
        navigate("/onboarding/birthday");
      } catch (error) {
        console.error("닉네임 처리 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="사용할 닉네임을 입력해주세요"
        highlight="닉네임임"
        subtitle="3글자 이내로 입력이 가능해요."
        progress={1 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/")}
      />

      <div className="flex-1 px-4">
        <div className="mt-4">
          <Input
            value={nickname}
            onChange={setNickname}
            placeholder="클릭하여 입력해주세요"
            onClear={() => setNickname("")}
          />
        </div>
        {error && (
          <p className="text-red-500 text-center text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="p-4">
        <Button 
          variant={nickname.trim() ? "active" : "inactive"} 
          onClick={handleSubmit} 
          disabled={!nickname.trim() || isLoading}
        >
          {isLoading ? "처리 중..." : "다음"}
        </Button>
      </div>
    </div>
  );
};
