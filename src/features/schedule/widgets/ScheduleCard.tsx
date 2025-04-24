import { InfoCard } from "@/shared/ui";

interface ScheduleCardProps {
  schedule: string;
  tag: string;
  time: string;
  onClick?: () => void;
}

const statusTagMap: Record<string, { barColor: string; textColor: string; tagColor: string }> = {
  "매우 피곤해요": {
    barColor: "bg-red-0",
    textColor: "text-red-0",
    tagColor: "bg-red-100",
  },
  "조금 피곤해요": {
    barColor: "bg-green-100",
    textColor: "text-green-500",
    tagColor: "bg-green-100",
  },
  괜찮아요: {
    barColor: "bg-green-500",
    textColor: "text-white",
    tagColor: "bg-green-500",
  },
};

export const ScheduleCard = (props: ScheduleCardProps) => {
  const { barColor, textColor, tagColor } = statusTagMap[props.tag];

  return (
    <InfoCard barColor={barColor} className="justify-between">
      <div className="flex flex-col gap-1">
        <InfoCard.Tag tagColor={tagColor} textColor={textColor}>
          {props.tag}
        </InfoCard.Tag>
        <InfoCard.Title>{props.schedule}</InfoCard.Title>
      </div>
      <InfoCard.Time>{props.time}</InfoCard.Time>
    </InfoCard>
  );
};
