import React from "react";
import BackIcon from "@/assets/images/back.svg";

interface EditHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  onBack?: () => void;
}

export const EditHeader: React.FC<EditHeaderProps> = ({
  title,
  highlight,
  subtitle,
  onBack,
}) => {
  return (
    <div className="bg-white px-4 pt-6 pb-4">
      {/* 상단 버튼 */}
      <div className="mb-7 flex items-center justify-between">
        <button onClick={onBack}>
          <img src={BackIcon} alt="뒤로가기" className="h-6 w-6" />
        </button>
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
