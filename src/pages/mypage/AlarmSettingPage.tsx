import React from "react";
import { MyHeader } from "@/features/mypage/ui/MyPageHeader";
import { NotificationToggleList } from "@/features/mypage";
import { useNavigate } from "react-router";

export const AlarmSettingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-0 min-h-screen">
      <MyHeader title="알림 설정" onBack={() => navigate("/mypage")} />
      <NotificationToggleList />
    </div>
  );
};