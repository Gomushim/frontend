import { useEffect, useState } from "react";
import { checkStatusQueries } from "@/entities/check_status/service";
import CharacterDefaultIcon from "@/assets/images/character_default.svg";
import { EMOTION_IMAGES } from "@/entities/types/emotion";
import { MainHeader } from "./MainHeader";
import { useNavigate } from "react-router";
import { useCoupleStore } from "@/stores/coupleStore";

const NUMBER_TO_EMOTION: Record<number, keyof typeof EMOTION_IMAGES> = {
  1: "miss",
  2: "happy",
  3: "common",
  4: "tired",
  5: "sad",
  6: "worry",
  7: "angry",
};

export const StatusSection = () => {
  const navigate = useNavigate();
  const { isConnected, isInitialized } = useCoupleStore();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [emotion, setEmotion] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected && isInitialized) {
        try {
          const [statusResponse, emotionResponse] = await Promise.all([
            checkStatusQueries.getMyStatusMessage(),
            checkStatusQueries.getMyEmotion()
          ]);
          setStatusMessage(statusResponse.result.statusMessage);
          setEmotion(emotionResponse.result.emotion);
        } catch (error) {
          console.error("데이터 조회 실패:", error);
        }
      }
    };

    fetchData();
  }, [isConnected, isInitialized]);

  const handleStatusClick = () => {
    if (isConnected && isInitialized) {
      navigate("/status");
    }
  };

  const EmotionIcon = isConnected && isInitialized && emotion ? EMOTION_IMAGES[NUMBER_TO_EMOTION[emotion]].base : null;

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
          <span className={statusMessage ? "text-gray-900" : "text-gray-500"}>
            {!isConnected
              ? "커플 연결을 해주세요."
              : !isInitialized
                ? "초기 설정을 완료해주세요."
                : statusMessage || "오늘 기분은 어떤가요?"}
          </span>
        </div>
      </section>
    </>
  );
};
