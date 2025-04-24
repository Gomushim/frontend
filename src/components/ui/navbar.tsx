import { useState } from "react";

import HomeBlack from "@/assets/images/home_black.svg";
import HomeGray from "@/assets/images/home_gray.svg";
import CalendarBlack from "@/assets/images/calendar_black.svg";
import CalendarGray from "@/assets/images/calendar_gray.svg";
import MypageBlack from "@/assets/images/mypage_black.svg";
import MypageGray from "@/assets/images/mypage_gray.svg";

type Tab = "home" | "calendar" | "my";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const tabs = [
    {
      key: "home",
      label: "홈",
      activeIcon: HomeBlack,
      inactiveIcon: HomeGray,
    },
    {
      key: "calendar",
      label: "캘린더",
      activeIcon: CalendarBlack,
      inactiveIcon: CalendarGray,
    },
    {
      key: "my",
      label: "마이",
      activeIcon: MypageBlack,
      inactiveIcon: MypageGray,
    },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-1/2 flex h-[95px] w-full -translate-x-1/2 transform items-center justify-between bg-white px-4 sm:h-[80px] sm:px-6 md:h-[95px]">
      {tabs.map(({ key, label, activeIcon, inactiveIcon }) => {
        const isActive = activeTab === key;
        const iconSrc = isActive ? activeIcon : inactiveIcon;

        return (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex flex-grow flex-col items-center justify-center space-y-1">
            <img src={iconSrc} alt={label} className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className={`text-xs sm:text-sm ${isActive ? "text-gray-1000" : "text-gray-200"} font-medium`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavBar;
