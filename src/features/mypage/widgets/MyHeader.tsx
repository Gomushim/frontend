import React from "react";
import BackIcon from "@/assets/images/back.svg";
import { useNavigate } from "react-router";

interface MyHeaderProps {
  title: string;
}

export const MyHeader: React.FC<MyHeaderProps> = ({ title}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/mypage");
  };

  return (
    <div className="bg-white px-4 pt-6 pb-4">
      {/* 상단 버튼 */}
      <div className="mb-7 flex items-center relative">
        <button onClick={handleBack} className="absolute left-0">
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
        <h1 className="w-full text-center text-xl font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  );
};

