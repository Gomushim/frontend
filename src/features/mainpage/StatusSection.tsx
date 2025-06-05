import { useEmotionStatusQueries } from "@/entities/main_status";
import CharacterDefaultIcon from "@/assets/images/character_default.svg";
import { EMOTION_IMAGES } from "@/entities/types/emotion";
import { MainHeader } from "./ui/MainHeader";
import { useNavigate } from "react-router";

interface StatusSectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

const EMOTION_TO_ICON: Record<string, keyof typeof EMOTION_IMAGES> = {
  MISS: "miss",
  HAPPY: "happy",
  COMMON: "common",
  TIRED: "tired",
  SAD: "sad",
  WORRY: "worry",
  ANGRY: "angry",
};

export const StatusSection = ({ isConnected, isInitialized }: StatusSectionProps) => {
  const navigate = useNavigate();
  const { getCoupleEmotion, getStatusMessage } = useEmotionStatusQueries({
    enabled: isConnected && isInitialized,
  });
  const emotion = getCoupleEmotion.data?.data?.result?.emotion ?? "";
  const statusMessage = getStatusMessage.data?.data?.result?.statusMessage ?? "";

  const handleStatusClick = () => {
    if (isConnected && isInitialized) {
      navigate("/status");
    }
  };

  const EmotionIcon =
    isConnected && isInitialized && emotion && EMOTION_TO_ICON[emotion]
      ? EMOTION_IMAGES[EMOTION_TO_ICON[emotion]].base
      : null;

  return (
    <>
      <MainHeader
        mainTitle="연인의 상태 메세지"
        buttonText="상태 메세지 쓰러가기"
        onClick={handleStatusClick}
        disabled={!isConnected || !isInitialized}
        isConnected={isConnected}
        isInitialized={isInitialized}
      />
      <section className="rounded-2xl bg-white p-6">
        <div className="flex items-center text-sm font-semibold">
          {EmotionIcon ? (
            <EmotionIcon className="mr-3 h-5 w-5" />
          ) : (
            <img src={CharacterDefaultIcon} alt="캐릭터" className="mr-3 h-6 w-6" />
          )}
          <span className={`text-md font-semibold ${statusMessage ? "text-gray-900" : "text-gray-500"}`}>
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
