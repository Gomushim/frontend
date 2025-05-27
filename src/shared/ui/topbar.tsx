import { useLocation, useNavigate } from "react-router";

interface TopbarProps {
  isEditMode: boolean;
}

export const Topbar = ({ isEditMode }: TopbarProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    if (!isEditMode) {
      navigate(path);
    }
  };

  const isSchedule = pathname.includes("/calendar/schedule");
  const isDday = pathname.includes("/calendar/dday");

  return (
    <div className="flex h-8 w-[250px] cursor-pointer items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-white">
      <div
        className={`flex h-full flex-1 items-center justify-center rounded-full text-center ${isSchedule ? "bg-gray-1000" : "bg-gray-100"}`}
        onClick={() => handleClick("/calendar/schedule/new")}>
        일정
      </div>
      <div
        className={`flex h-full flex-1 items-center justify-center rounded-full ${isDday ? "bg-gray-1000" : "bg-gray-100"}`}
        onClick={() => handleClick("/calendar/dday/new")}>
        디데이
      </div>
    </div>
  );
};
