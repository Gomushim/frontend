import { useSelectedDate } from "@/features/schedule/context/SelectedDateContext";
import { useGetScheduleList } from "@/entities/schedule/query";
import { ScheduleCard } from "./ScheduleCard";
import { CalendrDdayCard } from "./CalendrDdayCard";

export const MainScheduleCardList = () => {
  const { selectedDay } = useSelectedDate();
  const { data: scheduleListData } = useGetScheduleList(selectedDay);

  return (
    <div className="flex flex-col gap-3">
      {scheduleListData?.result.anniversaries.map(dday => (
        <CalendrDdayCard key={dday.id} {...dday} className="bg-gray-50" />
      ))}
      {scheduleListData?.result.schedules.map(schedule => (
        <ScheduleCard key={schedule.id} {...schedule} className="bg-gray-50" />
      ))}
    </div>
  );
};
