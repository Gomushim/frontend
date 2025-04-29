import { DateText } from "@/shared/ui";
import { ScheduleOverViewProps } from "../type";
import { Fatigue } from "@/entities/schedule/model";
import tripleArrow from "@/assets/icons/tripleArrow.svg";

const statusMap: Record<Fatigue, { bgColor: string; textColor: string; text: string }> = {
  VERY_TIRED: {
    bgColor: "bg-red-100",
    textColor: "text-red-0",
    text: "매우 피곤해요",
  },
  TIRED: {
    bgColor: "bg-green-500",
    textColor: "text-green-100",
    text: "피곤해요",
  },
  GOOD: {
    bgColor: "bg-green-100",
    textColor: "text-green-500",
    text: "괜찮아요",
  },
};

export const ScheduleOverView = (props: ScheduleOverViewProps) => {
  const { bgColor, textColor, text } = statusMap[props.fatigue as Fatigue];

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <h2 className={`${bgColor} ${textColor} text-md pt-3 pb-2 text-center font-semibold`}>{text}</h2>
      <h2 className="py-3 text-center text-xl font-bold text-gray-900">{props.title}</h2>
      <div className="flex justify-between bg-gray-50 p-3">
        <DateText className="rounded-2xl bg-white px-2 py-1 text-[12px] font-semibold" date={props.startDateTime} />
        <img className="w-8" src={tripleArrow} alt="화살표" />
        <DateText className="rounded-2xl bg-white px-2 py-1 text-[12px] font-semibold" date={props.endDateTime} />
      </div>
    </div>
  );
};
