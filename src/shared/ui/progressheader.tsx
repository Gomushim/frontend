import React from "react";
import BackIcon from "@/assets/images/back.svg";
import CloseIcon from "@/assets/images/close.svg";

interface ProgressHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  progress?: number;
  onBack?: () => void;
  onClose?: () => void;
}

export const ProgressHeader = ({ title, highlight, subtitle, progress = 0, onBack, onClose }: ProgressHeaderProps) => {
  return (
    <div className="bg-white px-4 pt-6 pb-4">
      {/* 상단 버튼 */}
      <div className="mb-3 flex items-center justify-between">
        <button onClick={onBack}>
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
        <button onClick={onClose}>
          <img src={CloseIcon} alt="닫기" className="h-6 w-6" />
        </button>
      </div>

      {/* 진행 바 */}
      <div className="mb-4 h-1 w-full rounded-full bg-gray-100">
        <div
          className="h-1 rounded-full bg-green-500 transition-all"
          style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
        />
      </div>

      {/* 텍스트 */}
      <h1 className="text-left text-3xl font-bold text-gray-900">
        {title.split(highlight).map((part, index, arr) => (
          <React.Fragment key={index}>
            {part}
            {index < arr.length - 1 && <span className="text-green-500">{highlight}</span>}
          </React.Fragment>
        ))}
      </h1>
      {subtitle && <p className="text-md font-regular text-left text-gray-500">{subtitle}</p>}
    </div>
  );
};
