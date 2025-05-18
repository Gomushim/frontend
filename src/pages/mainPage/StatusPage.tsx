import { useState } from "react";
import { EmotionSelector } from "@/features/mainpage";
import { Textinput } from "@/shared/ui";
import { EmotionType } from "@/entities/types/emotion";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router";
import { useEmotionStatusMutation } from "@/entities/main_status/mutation";
import { useQueryClient } from "@tanstack/react-query";

type ApiEmotionType = "MISS" | "HAPPY" | "COMMON" | "TIRED" | "SAD" | "WORRY" | "ANGRY";

const EMOTION_TO_API: Record<EmotionType, ApiEmotionType> = {
  miss: "MISS",
  happy: "HAPPY",
  common: "COMMON",
  tired: "TIRED",
  sad: "SAD",
  worry: "WORRY",
  angry: "ANGRY",
};

export const StatusPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | undefined>();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateMyEmotionAndStatusMessage } = useEmotionStatusMutation("post");

  const handleSubmit = async () => {
    if (!selectedEmotion) {
      alert("감정을 선택해주세요!");
      return;
    }
    if (!message) {
      alert("메시지를 입력해주세요!");
      return;
    }

    try {
      await updateMyEmotionAndStatusMessage.mutateAsync({
        emotion: EMOTION_TO_API[selectedEmotion],
        statusMessage: message,
      });
      await queryClient.invalidateQueries({ queryKey: ["myEmotion"] });
      await queryClient.invalidateQueries({ queryKey: ["myStatusMessage"] });
      await queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
      await queryClient.invalidateQueries({ queryKey: ["statusMessage"] });
      navigate("/mypage");
    } catch (error) {
      console.error("상태 메시지 업데이트 실패:", error);
      alert("상태 메시지 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex-1">
        <EmotionSelector selectedEmotion={selectedEmotion} onSelect={setSelectedEmotion} />
        <div className="p-4">
          <p className="pb-2 text-xl font-semibold text-gray-900">상태 메시지</p>
          <Textinput value={message} onChange={setMessage} placeholder="나의 상태를 연인에게 알려주세요" maxLength={15} />
        </div>
      </div>
      <div className="p-4">
        <Button
          onClick={handleSubmit}
          variant="active"
          size="onicon"
          disabled={updateMyEmotionAndStatusMessage.isPending}
          className="w-full"
        >확인</Button>
      </div>
    </div>
  );
};
