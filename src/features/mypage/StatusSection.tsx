import nextArrow from "@/assets/images/next_arrow.svg";
import { EMOTION_IMAGES,EMOTION_TO_ICON } from "@/entities/types/emotion";
import CharacterDefaultIcon from "@/assets/images/character_default.svg";
import { useMyEmotion, useMyStatusMessage } from "@/entities/mypage_info";
import { useNavigate } from "react-router";
import { useInitSettingQueries } from "@/entities/init_setting";
import { useIscouple } from "@/entities/iscouple";

export const StatusSection = () => {
  const navigate = useNavigate();
  const { data: emotionData } = useMyEmotion();
  const { data: statusMessageData } = useMyStatusMessage();
  const { getCoupleInfo } = useInitSettingQueries();
  const { checkCoupleConnect } = useIscouple();
  
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result.isAnniversariesRegistered ?? false;
  const emotion = emotionData?.result.emotion;
  const statusMessage = statusMessageData?.result.statusMessage;

  const EmotionIcon = isConnected && isInitialized && emotion && EMOTION_TO_ICON[emotion] 
    ? EMOTION_IMAGES[EMOTION_TO_ICON[emotion]].base 
    : null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 ">
      {/* 줄선 위 헤더 */}
      <div 
      className={`text-md font-medium text-gray-900 mb-5 flex items-center justify-between border-b border-gray-200 pb-2 ${(!isConnected || !isInitialized) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => isConnected && isInitialized && navigate("/status")}
      > 나의 상태 표기
        <img src={nextArrow} alt="다음" className="w-4 h-4" />
      </div>
      {/* 줄선 아래 */}
      <div >
        <section className="mb-4 rounded-2xl bg-white px-4 py-4">
          <div className="flex items-center text-sm font-semibold">
            {EmotionIcon ? (
              <EmotionIcon className="mr-3 h-6 w-6" />
            ) : (
              <img src={CharacterDefaultIcon} alt="캐릭터" />
            )}
            <span className={`font-semibold text-md ${statusMessage ? "text-gray-900" : "text-gray-500"}`}>
              {!isConnected
                ? "커플 연결을 해주세요."
                : !isInitialized
                ? "초기 설정을 해주세요."
                : statusMessage || "오늘 기분은 어떤가요?"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}; 