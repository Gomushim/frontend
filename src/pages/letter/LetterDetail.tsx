// 외부 라이브러리
import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router";

// UI
import { Button, Textarea } from "@/shared/ui";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";

// 유틸
import { formatDateFull, formatDateKoreanWithWeekday } from "@/shared/utils";

// 아이콘
import backIcon from "@/assets/icons/back.svg";

// 도메인: letter & comment
import { useCommentMutation } from "@/entities/comment/mutaion";
import { useGetLetterDetail } from "@/entities/letter/query";

export const LetterDetailPage = () => {
  // 라우터 훅
  const { scheduleId, letterId } = useParams<{ scheduleId: string; letterId: string }>();
  const navigate = useNavigate();

  // API 훅
  const { data: letterDetailData } = useGetLetterDetail(scheduleId || "", letterId || "");
  const { mutate } = useCommentMutation(letterId, scheduleId);

  // 이벤트 핸들러
  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const content = formData.get("content");

    // 유효성 검사
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
        form.reset();
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  const goBack = () => {
    navigate(-1);
    return goBack;
  };

  if (!letterDetailData) {
    return;
  }

  return (
    <>
      {/* 헤더 영역 */}
      <header className="relative mb-8 flex items-center justify-center">
        <Button variant="ghost" size="sIcon" className="absolute top-5 left-5" onClick={goBack}>
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-5 text-xl font-semibold text-gray-900">
          {formatDateKoreanWithWeekday(letterDetailData.result.letter.createdAt)}
        </h1>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative px-[22px]">
        {/* 편지 내용 */}
        <div className="flex flex-col gap-7">
          {/* 제목 */}
          <p className="flex items-center rounded-xl bg-gray-50 p-3 text-base font-normal break-words text-gray-900">
            {letterDetailData?.result.letter.title}
          </p>
          {/* 본문 */}
          <p className="rounded-xl bg-gray-50 p-3 text-base font-normal break-words text-gray-900">
            {letterDetailData?.result.letter.content}
          </p>

          {/* 이미지 캐러셀 */}
          {letterDetailData?.result.pictures.length > 0 && (
            <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
              <CarouselContent>
                {letterDetailData?.result.pictures.map((image, index) => {
                  return (
                    <CarouselItem key={index} className="relative max-w-50 md:basis-1/2 lg:basis-1/2">
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

          {/* 작성자 정보 */}
          <div className="flex flex-col items-end gap-1">
            <p className="text-xs font-semibold text-gray-700">From.{letterDetailData.result.letter.author}</p>
            <p className="text-xs font-semibold text-gray-700">
              {formatDateFull(letterDetailData.result.letter.createdAt)}
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 h-[1px] bg-[#F6F6F7]" />

        {/* 댓글 영역 */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-2">
            <h4 className="text-md font-semibold text-gray-900">댓글</h4>
            <h4 className="text-md font-semibold text-gray-500">{letterDetailData.result.comments.length}</h4>
          </div>

          {/* 댓글 리스트 */}
          <div className="mb-[150px] flex max-h-[450px] flex-col gap-6 overflow-y-auto">
            {letterDetailData.result.comments.map(comment => (
              <div key={comment.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-semibold text-gray-900">{comment.author}</h5>
                  <p className="text-xs font-medium text-gray-500">{formatDateFull(comment.createdAt)}</p>
                </div>
                <p className="text-sm font-medium break-words whitespace-pre-wrap text-gray-900">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 댓글 입력 폼 */}
        <form
          className="pc:w-[375px] fixed -bottom-8 left-1/2 mx-auto mb-8 max-h-25 w-full -translate-x-1/2 bg-white px-5 shadow-[0px_3px_12px_4px_rgba(218,218,218,0.15)]"
          onSubmit={handleCommentSubmit}>
          <div className="relative flex items-center">
            <Textarea
              className="min-h-25 w-full resize-none border-none pr-16 shadow-none focus-visible:ring-0"
              placeholder="댓글을 작성해 주세요."
              name="content"
              id="content"
              maxLength={80}
            />
            <Button type="submit" variant="active" className="absolute -top-0 right-2 z-10">
              입력
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
