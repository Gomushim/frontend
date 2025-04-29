import { useState } from "react";
import { EmotionSelector } from "@/features/ma-section";
import { Textinput } from "@/shared/ui";
import { EmotionType } from "@/entities/types/emotion";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router";
import { emotionStatusQueries } from "@/entities/emotion_status/service";

const EMOTION_TO_NUMBER: Record<EmotionType, number> = {
  miss: 1,
  happy: 2,
  common: 3,
  tired: 4,
  sad: 5,
  worry: 6,
  angry: 7,
};

export const StatusPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | undefined>();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      setIsSubmitting(true);
      await emotionStatusQueries.updateMyEmotionAndStatusMessage({
        emotion: EMOTION_TO_NUMBER[selectedEmotion],
        statusMessage: message,
      });
      navigate("/mainpage");
    } catch (error) {
      console.error("상태 메시지 업데이트 실패:", error);
      alert("상태 메시지 업데이트에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        >확인 </Button>
      </div>
    </div>
  );
};
