import { Fatigue } from "@/entities/schedule";
import { InfoCard } from "@/shared/ui";
import { formatTimeFromString } from "@/shared/utils/time/format";
import { useNavigate } from "react-router";

interface ScheduleCardProps {
  id: number;
  title: string;
  fatigue: Fatigue;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  className?: string;
  onClick?: () => void;
}

const statusTagMap: Record<string, { barColor: string; textColor: string; tagColor: string; tagName: string }> = {
  VERY_TIRED: {
    barColor: "bg-red-0",
    textColor: "text-red-0",
    tagColor: "bg-red-100",
    tagName: "매우 피곤해요",
  },
  TIRED: {
    barColor: "bg-green-100",
    textColor: "text-green-500",
    tagColor: "bg-green-100",
    tagName: "피곤해요",
  },
  GOOD: {
    barColor: "bg-green-500",
    textColor: "text-white",
    tagColor: "bg-green-500",
    tagName: "괜찮아요 ",
  },
};

export const ScheduleCard = (props: ScheduleCardProps) => {
  const { barColor, textColor, tagColor, tagName } = statusTagMap[props.fatigue] ?? "";
  const formattedTimeRange = `${formatTimeFromString(props.startDate)}~${formatTimeFromString(props.endDate)}`;

  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/calendar/schedule/${props.id}`);
  };

  return (
    <InfoCard barColor={barColor} className={`justify-between ${props.className}`} onClick={handleNavigateToDetail}>
      <InfoCard.Content>
        <div className="flex flex-col gap-1">
          <InfoCard.Tag tagColor={tagColor} textColor={textColor}>
            {tagName}
          </InfoCard.Tag>
          <InfoCard.Title>{props.title}</InfoCard.Title>
        </div>

        {!props.isAllDay && <InfoCard.Time>{formattedTimeRange}</InfoCard.Time>}
        {props.isAllDay && <InfoCard.Time>하루종일</InfoCard.Time>}
      </InfoCard.Content>
    </InfoCard>
  );
};
