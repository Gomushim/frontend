import { DateText } from "@/shared/ui";
import { ScheduleOverViewProps } from "../type";
import tripleArrow from "@/assets/icons/tripleArrow.svg";
import { Fatigue } from "@/entities/schedule";
import { formatDateFull } from "@/shared/utils";

const statusMap: Record<Fatigue, { bgColor: string; textColor: string; text: string }> = {
  VERY_TIRED: {
    bgColor: "bg-[rgba(255,196,231,0.6)]",
    textColor: "text-red-0",
    text: "매우 피곤해요",
  },
  TIRED: {
    bgColor: "bg-[rgba(191,230,218,0.6)]",
    textColor: "text-green-500",
    text: "피곤해요",
  },
  GOOD: {
    bgColor: "bg-[rgba(49,175,137,0.6)]",
    textColor: "text-green-800",
    text: "괜찮아요",
  },
};

export const ScheduleOverView = (props: ScheduleOverViewProps) => {
  const { bgColor, textColor, text } = statusMap[props.fatigue as Fatigue];

  const changedStartDate = formatDateFull(props.startDate);
  const changedEndDate = formatDateFull(props.endDate);

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <h2 className={`${bgColor} ${textColor} text-md pt-3 pb-2 text-center font-semibold`}>{text}</h2>
      <h2 className="py-3 text-center text-xl font-bold text-gray-900">{props.title}</h2>
      <div className="flex justify-between bg-gray-50 p-3">
        <DateText className="rounded-2xl bg-white px-2 py-1 text-[12px] font-semibold" date={changedStartDate} />
        <img className="w-8" src={tripleArrow} alt="화살표" />
        <DateText className="rounded-2xl bg-white px-2 py-1 text-[12px] font-semibold" date={changedEndDate} />
      </div>
    </div>
  );
};
