import { DateText, InfoCard } from "@/shared/ui";

interface LetterCardProps {
  id: number;
  title: string;
  content: string;
  creationDate: Date | string;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LetterCard = (props: LetterCardProps) => {
  return (
    <InfoCard className="">
      <InfoCard.Content className="flex-col gap-4">
        <div className="flex items-center gap-4">
          <InfoCard.Image imageUrl={props.imageUrl || ""} />
          <div className="flex flex-col gap-2">
            <InfoCard.Title>{props.title}</InfoCard.Title>
            <InfoCard.Text>{props.content}</InfoCard.Text>
          </div>
        </div>
        <div className="flex justify-between">
          <DateText date={props.creationDate} />
          <InfoCard.Option />
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
