import DateText from "../ui/DateText";
import InfoCard from "../ui/InCard";

interface DdayCardProps {
  schedule: string;
  iconSrc?: string;
  date: string;
  remainingDays: string;
  onClick?: () => void;
}

export const DdayCard = (props: DdayCardProps) => {
  return (
    <InfoCard className="justify-between">
      <InfoCard.IconTitle iconSrc={props.iconSrc || ""}>{props.schedule}</InfoCard.IconTitle>
      <div className="flex flex-col gap-1 text-end">
        <InfoCard.Title>{props.remainingDays}</InfoCard.Title>
        <DateText date={props.date} />
      </div>
    </InfoCard>
  );
};
