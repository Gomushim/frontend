import { InfoCard } from "@/shared/ui";
import { formatDateFull } from "@/shared/utils";
import { useNavigate, useParams } from "react-router";
import { DeleteAlert } from "./DeleteAlert";
import { MouseEvent } from "react";
import { useDeleteLetterMutation } from "@/entities/letter/mutation";
interface LetterCardProps {
  letterId: string;
  title: string;
  content: string;
  createdAt: string;
  pictureUrl?: string;
}

export const LetterCard = (props: LetterCardProps) => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();

  const { mutate } = useDeleteLetterMutation(scheduleId || "", props.letterId);

  const handleClick = () => {
    navigate(`/calendar/schedule/${scheduleId}/letter/${props.letterId}`);
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();

    mutate(undefined, {
      onSuccess: () => {
        alert("편지가 삭제되었습니다.");
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  return (
    <InfoCard onClick={handleClick}>
      <InfoCard.Content className="flex-col">
        <div className="flex items-center gap-4">
          {props.pictureUrl && <InfoCard.Image imageUrl={props.pictureUrl} />}
          <div className="flex flex-col items-start gap-2">
            <InfoCard.Title>{props.title}</InfoCard.Title>
            <InfoCard.Text>{props.content}</InfoCard.Text>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <InfoCard.Text>{formatDateFull(props.createdAt)}</InfoCard.Text>
          <InfoCard.Options className="items-center">
            <InfoCard.Option>편집</InfoCard.Option>
            <span className="align-middl inline-block h-3 w-[1.5px] bg-gray-300" />
            <DeleteAlert onDelete={handleDelete} />
          </InfoCard.Options>
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
