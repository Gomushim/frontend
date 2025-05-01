import { useEffect, useState } from "react";
import { useCheckStatus } from "@/entities/check_status/queries";
import CharacterDefaultIcon from "@/assets/images/character_default.svg";
import { EMOTION_IMAGES } from "@/entities/types/emotion";
import { MainHeader } from "./utils/MainHeader";
import { useNavigate } from "react-router";

interface StatusSectionProps {
  isConnected: boolean;
}

const EMOTION_TO_ICON: Record<string, keyof typeof EMOTION_IMAGES> = {
  "miss": "miss",
  "happy": "happy",
  "common": "common",
  "tired": "tired",
  "sad": "sad",
  "worry": "worry",
  "angry": "angry",
};

export const StatusSection = ({ isConnected }: StatusSectionProps) => {
  const navigate = useNavigate();
  const { getCoupleEmotion } = useCheckStatus();
  const [emotion, setEmotion] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        try {
          const response = await getCoupleEmotion();
          setEmotion(response.result.emotion);
        } catch (error) {
          console.error("데이터 조회 실패:", error);
        }
      }
    };

    fetchData();
  }, [isConnected, getCoupleEmotion]);

  const handleStatusClick = () => {
    if (isConnected) {
      navigate("/status");
    }
  };

  const EmotionIcon = isConnected && emotion && EMOTION_TO_ICON[emotion] 
    ? EMOTION_IMAGES[EMOTION_TO_ICON[emotion]].base 
    : null;

  return (
    <>
      <MainHeader
        mainTitle="연인의 상태 메세지"
        buttonText="상태 메세지 쓰러가기"
        onClick={handleStatusClick}
        disabled={!isConnected}
      />
      <section className="mb-4 rounded-2xl bg-white p-6">
        <div className="flex items-center text-sm font-semibold">
          {EmotionIcon ? (
            <EmotionIcon className="mr-3 h-5 w-5" />
          ) : (
            <img src={CharacterDefaultIcon} alt="캐릭터" className="mr-3 h-5 w-5" />
          )}
          <span className="text-gray-500">
            {!isConnected
              ? "커플 연결을 해주세요."
              : "오늘 기분은 어떤가요?"}
          </span>
        </div>
      </section>
    </>
  );
};
