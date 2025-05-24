import { useSelectedDate } from "@/features/schedule/context/SelectedDateContext";
import { useGetScheduleList } from "@/entities/schedule/query";
import { ScheduleCard } from "./ScheduleCard";
import { formatDateKoreanWithWeekday } from "@/shared/utils";
import { CalendrDdayCard } from "./CalendrDdayCard";

export const ScheduleCardList = () => {
  const { selectedDay } = useSelectedDate();
  const { data: scheduleListData } = useGetScheduleList(selectedDay);
  return (
    <>
      <h2>{selectedDay && formatDateKoreanWithWeekday(selectedDay)}</h2>
      {scheduleListData?.result.anniversaries.map(dday => (
        <CalendrDdayCard key={dday.id} {...dday} className="bg-white" />
      ))}
      {scheduleListData?.result.schedules.map(schedule => <ScheduleCard key={schedule.id} {...schedule} />)}
    </>
  );
};
