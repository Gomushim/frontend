import React from "react";

interface LoadingSpinnerProps {
  dotSize?: number;
  dotColorClass?: string;
  text?: string;
  textClassName?: string;
  direction?: "vertical" | "horizontal";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  dotSize = 6,
  dotColorClass = "bg-gray-900",
  text = "",
  textClassName = "text-xl text-gray-900 mt-5",
  direction = "vertical",
}) => {
  const Dots = (
    <div className="flex space-x-4">
      {[0, 1, 2].map((i) => (
        <div
        key={i}
        className={`rounded-full ${dotColorClass} animate-bounce-high`}
        style={{
          width: dotSize,
          height: dotSize,
          animationDelay: `${i * 0.2}s`,
        }}
      />
      
      ))}
    </div>
  );

  return (
    <div
      className={`flex items-center justify-center ${
        direction === "vertical" ? "flex-col" : "flex-row space-x-4"
      }`}
    >
      {Dots}
      {text && <span className={textClassName}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
