import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button } from "@/shared/ui";
import { EditHeader } from "@/features/mypage";
import { useUpdateMyNickname } from "@/entities/edit_info/mutation";

export const NicknameEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutate: updateNickname } = useUpdateMyNickname();

  const handleSubmit = () => {
    if (nickname.length > 3) {
      setError("닉네임은 3글자 이내로 입력해주세요.");
      return;
    }
    setError("");
    updateNickname(
      { nickname },
      {
        onSuccess: () => {
          navigate("/mypage/profileinfo");
        },
      }
    );
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (value.length > 3) {
      setError("닉네임은 3글자 이내로 입력해주세요.");
    } else {
      setError("");
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
        <div className="mt-10 relative">
          <Input
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력하세요"
            onClear={() => {
              setNickname("");
              setError("");
            }}
            status={error ? "error" : undefined}
          />
          {error && (
            <p className="absolute left-2 -bottom-6 text-red-0 text-sm">{error}</p>
          )}
        </div>
      </div>

      <div className="p-4">
        <Button 
          variant={nickname.trim() ? "active" : "inactive"} 
          onClick={handleSubmit} 
          disabled={!nickname.trim() }
          size="onicon"
        >저장
        </Button>
      </div>
    </div>
  );
};
