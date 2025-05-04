import React from "react";
import backIcon from "@/assets/images/back.svg";

interface MyHeaderProps {
  title: string;
  onBack?: () => void;
}

const MyHeader: React.FC<MyHeaderProps> = ({ title, onBack }) => {
  return (
    <header className="flex items-center h-12 px-1">
      <button
        className="mr-2 focus:outline-none"
        onClick={onBack}
        type="button"
        aria-label="뒤로가기"
      >
        <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
      </button>
      <h1 className="flex-1 text-center text-xl font-semibold text-gray-900 -ml-8">{title}</h1>
    </header>
  );
};

export default MyHeader;
