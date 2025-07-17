import nextArrow from "@/assets/images/next_arrow.svg";
import { useNavigate } from "react-router";

export const NotificationSetting = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/mypage/alarmsetting")}
      className={"bg-gray-50 rounded-lg p-4 font-medium text-md text-gray-900 flex items-center justify-between cursor-pointer"}
    >
      <span>알림 설정</span>
      <img src={nextArrow} alt="다음" className="w-4 h-4" />
    </div>
  );
}; 