import React from "react";

interface MainHeaderProps {
  mainTitle: string;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
}

export const MainHeader = ({ mainTitle, buttonText, onClick, disabled = false }: MainHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">{mainTitle}</h2>
      <button
        onClick={onClick}
        disabled={disabled}
        className={"text-sm font-medium text-gray-700"}
      >
        {buttonText} 
      </button>
    </div>
  );
};

// // 버튼이 있는 기본 사용
// <MessageHeader 
//   mainTitle="연인의 상태 메세지" 
//   onClick={() => console.log('버튼 클릭')}
// />

// // 커스텀 버튼 텍스트
// <MessageHeader 
//   mainTitle="연인의 상태 메세지" 
//   buttonText="더보기"
//   onClick={() => console.log('버튼 클릭')}
// />

// // 버튼 없이 사용
// <MessageHeader mainTitle="연인의 상태 메세지" />