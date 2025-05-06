import { useSelectedDateStore } from "@/entities/schedule";
import { useGetScheduleList } from "@/entities/schedule/query";
import { ScheduleCard } from "./ScheduleCard";
import { DdayCard } from "@/features/d-day/widgets";

export const MainScheduleCardList = () => {
  const { selectedDay } = useSelectedDateStore();
  const { data: scheduleListData } = useGetScheduleList(selectedDay);
  return (
    <div className="flex flex-col gap-3 px-4">
      {scheduleListData?.result.anniversaries.map(dday => <DdayCard key={dday.id} {...dday} className="bg-gray-50" />)}
      {scheduleListData?.result.schedules.map(schedule => (
        <ScheduleCard key={schedule.id} {...schedule} className="bg-gray-50" />
      ))}
    </div>
  );
};
