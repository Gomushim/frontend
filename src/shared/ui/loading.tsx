import React from "react";

interface LoadingSpinnerProps {
  size?: number; // px 단위
  colorClass?: string; // tailwind 색상 클래스
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  colorClass = "border-gray-900",
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${colorClass}`}
      style={{ width: size, height: size }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
