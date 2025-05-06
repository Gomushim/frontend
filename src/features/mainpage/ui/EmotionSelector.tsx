import { useState } from "react";
import { useNavigate } from "react-router";
import { EmotionItem, EmotionType, EmotionStatus, EMOTION_IMAGES } from "@/entities/types/emotion";
import BackIcon from "@/assets/images/back.svg";

interface EmotionSelectorProps {
  onSelect: (emotion: EmotionType) => void;
  selectedEmotion?: EmotionType;
  onBack?: () => void;
}

const EMOTIONS: EmotionItem[] = [
  { type: "angry", label: "화가나요" },
  { type: "worry", label: "걱정돼요" },
  { type: "happy", label: "아주 늘 행복해요" },
  { type: "miss", label: "그리워요" },
  { type: "common", label: "보통이에요" },
  { type: "sad", label: "슬퍼요" },
  { type: "tired", label: "피곤해요" },
];

export const EmotionSelector = ({ onSelect, selectedEmotion, onBack }: EmotionSelectorProps) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<EmotionType | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const getEmotionStatus = (type: EmotionType): EmotionStatus => {
    if (selectedEmotion === type) return "focus";
    if (!selectedEmotion) return "default";
    if (hoveredEmotion === type) return "default";
    return "inactive";
  };

  const getEmotionComponent = (type: EmotionType, status: EmotionStatus) => {
    const Component = EMOTION_IMAGES[type][status];
    return <Component className=" transition-all duration-300  h-24 w-24" />;
  };

  return (
    <div className="bg-white px-4 pt-6 pb-13">
      <div className="mb-3 items-center justify-between">
        <button className="pb-6" onClick={handleBack}>
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
        <h1 className="text-left text-3xl font-bold text-gray-900">오늘 기분은 어때요?</h1>
        <p className="text-md font-regular text-left text-gray-500">현재 기분을 선택해주세요!</p>
      </div>
      <div className="mt-5 px-4">
        <div className="grid grid-cols-3 gap-6">
          {EMOTIONS.map(emotion => {
            const status = getEmotionStatus(emotion.type);
            return (
              <button
                key={emotion.type}
                className="flex flex-col items-center gap-2"
                onClick={() => onSelect(emotion.type)}
                onMouseEnter={() => setHoveredEmotion(emotion.type)}
                onMouseLeave={() => setHoveredEmotion(null)}>
                {getEmotionComponent(emotion.type, status)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
