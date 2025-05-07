import { InfoCard } from "@/shared/ui";
import { formatDateDot } from "@/shared/utils";

interface LetterCardProps {
  letterId: string;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LetterCard = (props: LetterCardProps) => {
  return (
    <InfoCard className="">
      <InfoCard.Content className="flex-col">
        <div className="flex items-center gap-4">
          <InfoCard.Image imageUrl={props.imageUrl || ""} />
          <div className="flex flex-col items-start gap-2">
            <InfoCard.Title>{props.title}</InfoCard.Title>
            <InfoCard.Text>{props.content}</InfoCard.Text>
          </div>
        </div>
        <div className="flex justify-between">
          <InfoCard.Text>{formatDateDot(props.createdAt)}</InfoCard.Text>
          <InfoCard.Option />
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
