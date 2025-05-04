import { memo } from "react";

interface TopbarProps {
  isToggle: boolean;
  onToggle: () => void;
}

export const Topbar = memo(({ isToggle, onToggle }: TopbarProps) => {
  return (
    <div className="flex h-8 w-[250px] cursor-pointer items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-white">
      <div
        className={`flex h-full flex-1 items-center justify-center rounded-full text-center ${!isToggle ? "bg-gray-1000" : "bg-gray-100"}`}
        onClick={onToggle}>
        일정
      </div>
      <div
        className={`flex h-full flex-1 items-center justify-center rounded-full ${isToggle ? "bg-gray-1000" : "bg-gray-100"}`}
        onClick={onToggle}>
        디테일
      </div>
    </div>
  );
});
