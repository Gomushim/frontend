import React, { useState } from "react";
import { Switch } from "@/shared/ui/switch";

const toggleItems = [
  { label: "앱 전체 알림" },
  { label: "디데이 알림" },
  { label: "연인의 상태 알림" },
];

export const NotificationToggleList: React.FC = () => {
  const [toggles, setToggles] = useState([false, false, false]);

  const handleToggle = (idx: number) => {
    setToggles((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="flex flex-col gap-4 px-4 mt-2">
      {toggleItems.map((item, idx) => (
        <div
          key={item.label}
          className="flex items-center justify-between bg-gray-50 rounded-2xl  px-4 py-5"
        >
          <span className="text-gray-900 text-md font-medium">{item.label}</span>
          <Switch
            checked={toggles[idx]}
            onCheckedChange={() => handleToggle(idx)}
            className="ml-2"
          />
        </div>
      ))}
    </div>
  );
}; 