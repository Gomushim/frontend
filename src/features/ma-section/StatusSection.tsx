import { useEffect, useState } from "react";
import { useEmotionStatusQueries } from "@/entities/emotion_status/mutation";
import CharacterDefaultIcon from "@/assets/images/character_default.svg";
import { EMOTION_IMAGES } from "@/entities/types/emotion";
import { MainHeader } from "./utils/MainHeader";
import { useNavigate } from "react-router";

interface StatusSectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

const EMOTION_TO_ICON: Record<string, keyof typeof EMOTION_IMAGES> = {
  "MISS": "miss",
  "HAPPY": "happy",
  "COMMON": "common",
  "TIRED": "tired",
  "SAD": "sad",
  "WORRY": "worry",
  "ANGRY": "angry",
};

export const StatusSection = ({ isConnected, isInitialized }: StatusSectionProps) => {
  const navigate = useNavigate();
  const { getCoupleEmotion, getStatusMessage } = useEmotionStatusQueries();
  const [emotion, setEmotion] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isConnected || !isInitialized) return;

      try {
        const [emotionResponse, statusResponse] = await Promise.all([
          getCoupleEmotion.refetch(),
          getStatusMessage.refetch()
        ]);

        if (isMounted) {
          if (emotionResponse.data?.data) {
            setEmotion(emotionResponse.data.data.result.emotion);
          }
          if (statusResponse.data?.data) {
            setStatusMessage(statusResponse.data.data.result.statusMessage);
          }
        }
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isConnected, isInitialized]);

  const handleStatusClick = () => {
    if (isConnected && isInitialized) {
      navigate("/status");
    }
  };

  const EmotionIcon = isConnected && isInitialized && emotion && EMOTION_TO_ICON[emotion] 
    ? EMOTION_IMAGES[EMOTION_TO_ICON[emotion]].base 
    : null;

  return (
    <>
      <MainHeader
        mainTitle="연인의 상태 메세지"
        buttonText="상태 메세지 쓰러가기"
        onClick={handleStatusClick}
        disabled={!isConnected || !isInitialized}
      />
      <section className="mb-4 rounded-2xl bg-white p-6">
        <div className="flex items-center text-sm font-semibold">
          {EmotionIcon ? (
            <EmotionIcon className="mr-3 h-5 w-5" />
          ) : (
            <img src={CharacterDefaultIcon} alt="캐릭터" className="mr-3 h-5 w-5" />
          )}
          <span className={`${statusMessage ? "text-gray-900" : "text-gray-500"}`}>
            {!isConnected
              ? "커플 연결을 해주세요."
              : !isInitialized
              ? "초기 설정을 해주세요."
              : statusMessage || "오늘 기분은 어떤가요?"}
          </span>
        </div>
      </section>
    </>
  );
};
