import { useState } from "react";
import { EmotionSelector } from "@/features/mainpage";
import { Textinput } from "@/shared/ui";
import { EmotionType } from "@/entities/types/emotion";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router";
import { useEmotionStatusMutation } from "@/entities/main_status/mutation";

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
      navigate("/mainpage");
    } catch (error) {
      console.error("상태 메시지 업데이트 실패:", error);
      alert("상태 메시지 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="h-full flex-1 flex-col bg-white">
      <EmotionSelector selectedEmotion={selectedEmotion} onSelect={setSelectedEmotion} />
      <div className="p-4">
        <p className="pb-2 text-xl font-semibold text-gray-900">상태 메시지</p>
        <Textinput value={message} onChange={setMessage} placeholder="나의 상태를 연인에게 알려주세요" maxLength={15} />
      </div>
      <div className="p-4">
        <Button
          onClick={handleSubmit}
          variant="active"
          size="onicon"
          disabled={updateMyEmotionAndStatusMessage.isPending}
        >확인 </Button>
      </div>
    </div>
  );
};
