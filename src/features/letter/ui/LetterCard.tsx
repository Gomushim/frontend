// 외부 라이브러리 import
import { useNavigate, useParams } from "react-router";

// 훅
import { useDeleteLetterMutation } from "@/entities/letter/mutation";

// UI
import { DeleteAlert } from "../../../shared/ui/deleteAlert";
import { InfoCard } from "@/shared/ui";

// 유틸
import { formatDateFull } from "@/shared/utils";

// 타입
import { MouseEvent } from "react";
import { WriteLetterBottomSheet } from "../WriteLetterBottomSheet";

interface LetterCardProps {
  letterId: string;
  title: string;
  content: string;
  createdAt: string;
  pictureUrl?: string;
}

export const LetterCard = (props: LetterCardProps) => {
  // 라우터 파라미터에서 scheduleId 추출
  const { scheduleId } = useParams<{ scheduleId: string }>();

  // 라우터 훅
  const navigate = useNavigate();

  // API 훅
  const { mutate } = useDeleteLetterMutation(scheduleId || "", props.letterId);

  // 이벤트 핸들러
  const handleClick = (event: MouseEvent) => {
    const tagName = (event.target as HTMLElement).tagName.toLowerCase();
    if (["button", "input", "textarea", "svg", "path"].includes(tagName)) return;
    navigate(`/calendar/schedule/${scheduleId}/letter/${props.letterId}`);
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
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
        <div className=" mt-3 flex justify-between">
          <InfoCard.Text>{formatDateFull(props.createdAt)}</InfoCard.Text>
          <InfoCard.Options className="items-center">
            <WriteLetterBottomSheet title={props.title} content={props.content} letterId={props.letterId}>
              <InfoCard.Option>편집</InfoCard.Option>
            </WriteLetterBottomSheet>
            <span className="align-middl inline-block h-3 w-[1.5px] bg-gray-300" />
            <DeleteAlert
              onDelete={handleDelete}
              title="편지 삭제"
              description="정말 편지를 삭제하시겠어요?"
              buttonText="삭제"
              cancelText="취소">
              <InfoCard.Option>삭제</InfoCard.Option>
            </DeleteAlert>
          </InfoCard.Options>
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
