import { useSelectedDateStore } from "@/entities/schedule";
import { useGetScheduleList } from "@/entities/schedule/query";
import { ScheduleCard } from "./ScheduleCard";
import { formatDateKoreanWithWeekday } from "@/shared/utils";

export const ScheduleCardList = () => {
  const { selectedDay } = useSelectedDateStore();
  const { data: scheduleListData } = useGetScheduleList(selectedDay);
  return (
    <>
      <h2>{formatDateKoreanWithWeekday(selectedDay)}</h2>
      {scheduleListData?.result.schedules.map(schedule => <ScheduleCard key={schedule.id} {...schedule} />)}
    </>
  );
};
