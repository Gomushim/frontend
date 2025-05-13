import { InfoCard } from "@/shared/ui";
import { formatDateFull } from "@/shared/utils";

interface LetterCardProps {
  letterId: string;
  title: string;
  content: string;
  createdAt: string;
  pictureUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LetterCard = (props: LetterCardProps) => {
  return (
    <InfoCard>
      <InfoCard.Content className="flex-col">
        <div className="flex items-center gap-4">
          <InfoCard.Image imageUrl={props.pictureUrl || ""} />
          <div className="flex flex-col items-start gap-2">
            <InfoCard.Title>{props.title}</InfoCard.Title>
            <InfoCard.Text>{props.content}</InfoCard.Text>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <InfoCard.Text>{formatDateFull(props.createdAt)}</InfoCard.Text>
          <InfoCard.Option />
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
