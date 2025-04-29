import { InfoCard } from "@/shared/ui";

interface ScheduleCardProps {
  schedule: string;
  tag: string;
  time: string;
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
  const { barColor, textColor, tagColor, tagName } = statusTagMap[props.tag];

  return (
    <InfoCard barColor={barColor} className={`justify-between ${props.className}`}>
      <InfoCard.Content>
        <div className="flex flex-col gap-1">
          <InfoCard.Tag tagColor={tagColor} textColor={textColor}>
            {tagName}
          </InfoCard.Tag>
          <InfoCard.Title>{props.schedule}</InfoCard.Title>
        </div>
        <InfoCard.Time>{props.time}</InfoCard.Time>
      </InfoCard.Content>
    </InfoCard>
  );
};
