import { useState, useRef, FormEvent } from "react";
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, SInput, Textarea } from "@/shared/ui";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import crossDeleteIcon from "@/assets/icons/crossDelete.svg";
import { useCreateLetterMutation, useUpdateLetterMutation } from "@/entities/letter/mutation";
import { useParams } from "react-router";
import { useToggle } from "@/shared/hooks";
import { formatDateKoreanWithWeekday } from "@/shared/utils";

interface WriteLetterBottomSheetProps {
  letterId?: string;
  title?: string;
  content?: string;
  imagesUrl?: string[];
  children?: React.ReactNode;
}

export const WriteLetterBottomSheet = ({
  letterId,
  title = "",
  content = "",
  // imagesUrl = [],
  children,
}: WriteLetterBottomSheetProps) => {
  // 생성/수정 분기
  const isEdit = !!letterId;

  // 상태: 수정 모드면 기존 값, 생성 모드면 빈 값
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const MAX_IMAGES = 3;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isToggle, onToggle } = useToggle();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { mutate } = useCreateLetterMutation(scheduleId || "");
  const { mutate: updateMutate } = useUpdateLetterMutation(scheduleId || "");

  const handleImageUpload = (files: FileList) => {
    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots <= 0) {
      alert("이미지는 최대 3개까지만 등록할 수 있습니다.");
      return;
    }

    const newImages = Array.from(files).slice(0, remainingSlots);
    setImages(prev => [...prev, ...newImages]);
  };

  const handleImageDelete = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // 파일 선택창 열기
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 폼 제출 핸들러 (생성/수정 분기)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!editTitle.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!editContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    const upsertLetterRequest = {
      letterId: isEdit ? letterId : null,
      scheduleId: scheduleId || "",
      title: editTitle,
      content: editContent,
    };
    const finalFormData = new FormData();
    finalFormData.append(
      "upsertLetterRequest",
      new Blob([JSON.stringify(upsertLetterRequest)], { type: "application/json" })
    );
    images.forEach(file => {
      finalFormData.append("pictures", file);
    });

    // 분기: 생성/수정
    if (isEdit) {
      updateMutate(
        { upsertLetterRequest },
        {
          onSuccess: () => {
            alert("편지가 수정되었습니다.");
            setEditTitle("");
            setEditContent("");
            setImages([]);
            onToggle();
          },
          onError: error => {
            console.error(error);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } else {
      mutate(finalFormData, {
        onSuccess: () => {
          alert("편지가 등록되었습니다.");
          setEditTitle("");
          setEditContent("");
          setImages([]);
          onToggle();
        },
        onError: error => {
          console.error(error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    }
  };

  return (
    <Drawer open={isToggle} onOpenChange={onToggle}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="px-5 pt-2 pb-15">
        <form className="mx-auto w-full max-w-sm" onSubmit={handleSubmit}>
          <DrawerHeader className="flex-row justify-between px-0">
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-gray-0 p-0 text-sm font-semibold text-green-600 hover:text-green-700"
              onClick={onToggle}>
              취소
            </Button>
            <DrawerTitle>{formatDateKoreanWithWeekday(new Date())}</DrawerTitle>
            <Button
              type="submit"
              variant="ghost"
              disabled={isSubmitting}
              className="hover:bg-gray-0 p-0 text-sm font-semibold text-green-600 hover:text-green-700 disabled:text-green-300">
              완료
            </Button>
          </DrawerHeader>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-gray-900" htmlFor="title">
                제목
              </label>
              <SInput
                className="bg-gray-50"
                id="title"
                name="title"
                type="text"
                placeholder="제목을 입력해 주세요"
                maxLength={20}
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-gray-900" htmlFor="content">
                내용
              </label>
              <Textarea
                className="min-h-[140px] bg-gray-50 p-3 focus-visible:border-green-300 focus-visible:ring-green-300"
                id="content"
                name="content"
                placeholder="내용을 입력해 주세요"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
              />
            </div>

            <div className="min-h-[270px]">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-md font-semibold text-gray-900" htmlFor="image">
                  이미지
                </label>
                <Button variant="square" size="2xs" onClick={openFileDialog} type="button">
                  이미지 첨부
                </Button>
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={e => {
                    if (e.target.files) {
                      handleImageUpload(e.target.files);
                    }
                  }}
                />
              </div>

              {images.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                  <CarouselContent>
                    {images.map((image, index) => {
                      const objectUrl = URL.createObjectURL(image);
                      return (
                        <CarouselItem key={index} className="relative max-w-50 md:basis-1/2 lg:basis-1/2">
                          <div className="p-1">
                            <img
                              src={objectUrl}
                              alt={`preview-${index}`}
                              className="h-50 w-50 rounded-md object-cover"
                              onLoad={() => URL.revokeObjectURL(objectUrl)}
                            />
                            <Button
                              variant="ghost"
                              size="2xsIcon"
                              type="button"
                              className="absolute top-3 right-3"
                              onClick={() => handleImageDelete(index)}
                              aria-label="이미지 삭제">
                              <img src={crossDeleteIcon} alt="이미지 삭제" />
                            </Button>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              ) : (
                <p className="text-sm text-gray-400">첨부된 이미지가 없습니다.</p>
              )}
            </div>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
