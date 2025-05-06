import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button } from "@/shared/ui";
import { EditHeader } from "@/features/mypage";
import { useUpdateMyNickname } from "@/entities/edit_info/mutation";

export const NicknameEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const { mutate: updateNickname } = useUpdateMyNickname();

  const handleSubmit = () => {
    updateNickname(
      { nickname },
      {
        onSuccess: () => {
          navigate("/mypage/profileinfo");
        },
      }
    );
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
            placeholder="닉네임을 입력하세요"
            onClear={() => setNickname("")}
          />
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
