import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button} from "@/shared/ui";
import { EditHeader } from "@/features/mypage";

export const NicknameEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (nickname.trim()) {
      try {
        if (nickname.length > 3) {
          throw new Error("닉네임은 3글자 이내로 입력해주세요.");
        }
        navigate("/mypage/profileinfo");
      } catch (error) {
        console.error("닉네임 처리 중 오류 발생:", error);
        setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <EditHeader
        title="사용할 닉네임을 입력해주세요"
        subtitle="3글자 이내로 입력이 가능해요."
        highlight="닉네임"
        onBack={() => navigate("/mypage/profileinfo")}
      />

      <div className="flex-1 px-4">
        <div className="mt-10">
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
          disabled={!nickname.trim() }
          size="onicon"
         />
      </div>
    </div>
  );
};
