import nextArrow from "@/assets/images/next_arrow.svg";

export const NotificationSetting = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 font-medium text-md text-gray-900 cursor-pointer flex items-center justify-between">
      <span>알림 설정</span>
      <img src={nextArrow} alt="다음" className="w-4 h-4" />
    </div>
  );
}; 