import InfoCard from "../ui/InCard";

interface ScheduleCardProps {
  schedule: string;
  tag: string;
  time: string;
  barColor?: string;
  onClick?: () => void;
}

export const ScheduleCard = (props: ScheduleCardProps) => {
  return (
    <InfoCard barColor={props.barColor} className="justify-between">
      <div className="flex flex-col gap-1">
        <InfoCard.Tag barColor={props.barColor}>{props.tag}</InfoCard.Tag>
        <InfoCard.Title>{props.schedule}</InfoCard.Title>
      </div>
      <InfoCard.Time>{props.time}</InfoCard.Time>
    </InfoCard>
  );
};
