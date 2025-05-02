import { useState } from "react";
import { useNavigate } from "react-router";

import HomeBlack from "@/assets/images/home_black.svg";
import HomeGray from "@/assets/images/home_gray.svg";
import CalendarBlack from "@/assets/images/calendar_black.svg";
import CalendarGray from "@/assets/images/calendar_gray.svg";
import MypageBlack from "@/assets/images/mypage_black.svg";
import MypageGray from "@/assets/images/mypage_gray.svg";

type Tab = "home" | "calendar" | "my";

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const navigate = useNavigate();

  const tabs = [
    {
      key: "home",
      label: "홈",
      activeIcon: HomeBlack,
      inactiveIcon: HomeGray,
      path: "/",
    },
    {
      key: "calendar",
      label: "캘린더",
      activeIcon: CalendarBlack,
      inactiveIcon: CalendarGray,
      path: "/calendar",
    },
    {
      key: "my",
      label: "마이",
      activeIcon: MypageBlack,
      inactiveIcon: MypageGray,
      path: "/mypage",
    },
  ] as const;

  const handleTabClick = (key: Tab, path: string) => {
    setActiveTab(key);
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 flex h-[95px] w-full -translate-x-1/2 transform items-center justify-between bg-white px-4 sm:h-[80px] sm:px-6 md:h-[95px]">
      {tabs.map(({ key, label, activeIcon, inactiveIcon, path }) => {
        const isActive = activeTab === key;
        const iconSrc = isActive ? activeIcon : inactiveIcon;

        return (
          <button
            key={key}
            onClick={() => handleTabClick(key, path)}
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
