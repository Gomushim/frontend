import { useScheduleStore } from "@/entities/schedule"; // 전역 상태 가져오기
import { Switch } from "@/shared/ui";
import { useShallow } from "zustand/shallow";

export const AllDayToggleButton = () => {
  const { isAllDay, setIsAllDay } = useScheduleStore(
    useShallow(state => ({
      isAllDay: state.schedule.isAllDay,
      setIsAllDay: state.setIsAllDay,
    }))
  );

  const handleToggle = () => {
    setIsAllDay(!isAllDay); // 전역 상태 업데이트
  };

  return <Switch id="airplane-mode" className="checked:bg-green-500" onClick={handleToggle} />;
};
