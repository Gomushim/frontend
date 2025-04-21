import React from 'react';
import BackIcon from '@/assets/images/back.svg';
import CloseIcon from '@/assets/images/close.svg';

interface ProgressHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  progress?: number;
  onBack?: () => void;
  onClose?: () => void;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  title,
  highlight,
  subtitle,
  progress = 0,
  onBack,
  onClose,
}) => {
  return (
    <div className="px-4 pt-6 pb-4 bg-white">
      {/* 상단 버튼 */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={onBack}>
          <img src={BackIcon} alt="뒤로가기" className="w-6 h-6" />
        </button>
        <button onClick={onClose}>
          <img src={CloseIcon} alt="닫기" className="w-6 h-6" />
        </button>
      </div>

      {/* 진행 바 */}
      <div className="w-full h-1 bg-gray-100 rounded-full mb-4">
        <div
          className="h-1 bg-green-500 rounded-full transition-all"
          style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
        />
      </div>

     {/* 텍스트 */}
        <h1 className="text-left text-3xl font-bold text-gray-900">
          {title.split(highlight).map((part, index, arr) => (
            <React.Fragment key={index}>
              {part}
              {index < arr.length - 1 && (
                <span className="text-green-500">{highlight}</span>
              )}
            </React.Fragment>
          ))}
        </h1>
        {subtitle && (
          <p className="text-left text-md font-regular text-gray-500">{subtitle}</p>
        )}
    </div>
  );
};

