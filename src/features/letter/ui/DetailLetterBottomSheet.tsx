import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, Textarea } from "@/shared/ui";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { LetterCard } from ".";
import { useGetLetterDetail } from "@/entities/letter/query";
import { formatDateFull } from "@/shared/utils";
import { useToggle } from "@/shared/hooks";
import { useCommentMutation } from "@/entities/comment/mutaion";
import { FormEvent } from "react";

interface DetailLetterBottomSheetProps {
  letterId: string;
  scheduleId: string;
  title: string;
  content: string;
  createdAt: string;
  pictureUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const DetailLetterBottomSheet = (props: DetailLetterBottomSheetProps) => {
  const { isToggle, onToggle } = useToggle();

  const { data: letterDetailData } = useGetLetterDetail(props.scheduleId, props.letterId);
  const { mutate } = useCommentMutation("post", props.letterId, props.scheduleId);

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const content = formData.get("content");

    if (typeof content !== "string" || content.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const commentRequestBody = {
      commentId: null,
      content,
    };

    mutate(commentRequestBody, {
      onSuccess: () => {
        alert("폼이 제출되었습니다.");
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  if (!letterDetailData) {
    return;
  }

  return (
    <Drawer open={isToggle} onOpenChange={onToggle}>
      <DrawerTrigger asChild>
        <button className="">
          <LetterCard {...props} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="py10 px-5">
        <DrawerHeader className="flex-row justify-between px-0">
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-gray-0 p-0 text-sm font-semibold text-green-600 hover:text-green-700"
            onClick={onToggle}>
            취소
          </Button>
          <DrawerTitle>2025년 6월 5일 목요일</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-7">
          <p className="flex items-center rounded-xl bg-gray-50 p-3 text-base font-normal break-words text-gray-900">
            {letterDetailData?.result.letter.title}
          </p>
          <p className="rounded-xl bg-gray-50 p-3 text-base font-normal break-words text-gray-900">
            {letterDetailData?.result.letter.content}
          </p>
          {letterDetailData?.result.pictures.length > 0 && (
            <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
              <CarouselContent>
                {letterDetailData?.result.pictures.map((image, index) => {
                  return (
                    <CarouselItem key={index} className="relative md:basis-1/2 lg:basis-1/2">
                      <div className="p-1">
                        <img
                          src={image.pictureUrl}
                          alt={`preview-${index}`}
                          className="h-50 w-50 rounded-md object-cover"
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          )}
          <div className="flex flex-col items-end gap-1">
            <p className="text-xs font-semibold text-gray-700">From.{letterDetailData.result.letter.author}</p>
            <p className="text-xs font-semibold text-gray-700">
              {formatDateFull(letterDetailData.result.letter.createdAt)}
            </p>
          </div>
        </div>
        <div className="my-6 h-[1px] bg-[#F6F6F7]" />
        <div className="mb-[100px] flex min-h-[350px] flex-col gap-6">
          <h4 className="text-md font-semibold text-gray-900">
            댓글
            <span className="text-md font-semibold text-gray-900">{letterDetailData.result.comments.length}</span>
          </h4>
          {letterDetailData.result.comments.map(comment => (
            <div key={comment.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h5 className="text-xs font-semibold text-gray-900">{comment.author}</h5>
                <p className="text-xs font-medium text-gray-500">{formatDateFull(comment.createdAt)}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{comment.content}</p>
            </div>
          ))}
        </div>
        <form className="absolute right-0 bottom-0 w-full" onSubmit={handleCommentSubmit}>
          <Textarea
            className="mx-8 my-5 mb-14 w-full border-none shadow-none focus-visible:ring-0"
            placeholder="댓글을 작성해 주세요."
            name="content"
            id="content"
          />
          <Button type="submit" variant="active" className="absolute top-8 right-5">
            입력
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
