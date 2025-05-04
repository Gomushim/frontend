import { MyHeader } from "@/features/mypage/widgets/MyHeader";
import React from "react";

export const SettingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MyHeader title="설정" />
      <div className="px-4 pt-2 space-y-4">
        <button className="w-full text-left bg-gray-50 rounded-2xl mb-3 px-4 py-5 text-gray-900 text-base font-medium">로그아웃</button>
        <button className="w-full flex items-center justify-between bg-gray-50 rounded-2xl mb-1 px-4 py-5 text-gray-900 text-base font-medium">
          <span>커플 연결 끊기</span>
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6l6 6-6 6" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

