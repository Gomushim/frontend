import DateText from "../ui/DateText";
import InfoCard from "../ui/InCard";

interface LetterCardProps {
  contents: string;
  date: Date | string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LetterCard = (props: LetterCardProps) => {
  return (
    <InfoCard className="justify-between">
      <div className="flex flex-col gap-1">
        <InfoCard.Title>{props.contents}</InfoCard.Title>
        <DateText date={props.date} />
      </div>
      <InfoCard.Option />
    </InfoCard>
  );
};
