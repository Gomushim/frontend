import { useState, useRef, FormEvent } from "react";
import {
  Button,
  CountInput,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Textarea,
} from "@/shared/ui";
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
  imagesUrl = [],
  children,
}: WriteLetterBottomSheetProps) => {
  const isEdit = !!letterId;
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 기존 이미지 URL과 새로운 File 이미지를 함께 관리
  const [existingImages, setExistingImages] = useState<string[]>(imagesUrl);
  const [newImages, setNewImages] = useState<File[]>([]);
  const MAX_IMAGES = 3;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isToggle, onToggle } = useToggle();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { mutate } = useCreateLetterMutation(scheduleId || "");
  const { mutate: updateMutate } = useUpdateLetterMutation(scheduleId || "", letterId || "");

  const handleImageUpload = (files: FileList) => {
    const totalImages = existingImages.length + newImages.length;
    const remainingSlots = MAX_IMAGES - totalImages;

    if (remainingSlots <= 0) {
      alert("이미지는 최대 3개까지만 등록할 수 있습니다.");
      return;
    }

    const additionalImages = Array.from(files).slice(0, remainingSlots);
    setNewImages(prev => [...prev, ...additionalImages]);
  };

  const handleImageDelete = (index: number, type: "existing" | "new") => {
    if (type === "existing") {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setNewImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

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
      pictureUrls: existingImages,
    };

    const finalFormData = new FormData();
    finalFormData.append(
      "upsertLetterRequest",
      new Blob([JSON.stringify(upsertLetterRequest)], { type: "application/json" })
    );

    // 새로 추가된 이미지들을 pictures로 추가
    newImages.forEach(file => {
      finalFormData.append("pictures", file);
    });

    if (isEdit) {
      const updateFormData = new FormData();
      updateFormData.append(
        "upsertLetterRequest",
        new Blob([JSON.stringify(upsertLetterRequest)], { type: "application/json" })
      );
      newImages.forEach(file => {
        updateFormData.append("pictures", file);
      });

      updateMutate(updateFormData, {
        onSuccess: () => {
          alert("편지가 수정되었습니다.");
          setEditTitle("");
          setEditContent("");
          setExistingImages([]);
          setNewImages([]);
          onToggle();
        },
        onError: error => {
          console.error(error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } else {
      mutate(finalFormData, {
        onSuccess: () => {
          alert("편지가 등록되었습니다.");
          setEditTitle("");
          setEditContent("");
          setExistingImages([]);
          setNewImages([]);
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
      <DrawerContent className="min-h-[650px] px-5 pt-2" onClick={e => e.stopPropagation()}>
        <form className="mx-auto w-full max-w-sm" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
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
              <CountInput
                className="h-12 bg-gray-50"
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
                <Button
                  variant="square"
                  size="2xs"
                  onClick={openFileDialog}
                  type="button"
                  disabled={existingImages.length + newImages.length >= MAX_IMAGES}>
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

              {existingImages.length > 0 || newImages.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                  <CarouselContent>
                    {/* 기존 이미지 렌더링 */}
                    {existingImages.map((imageUrl, index) => (
                      <CarouselItem key={`existing-${index}`} className="basis-[200px] pl-4">
                        <div className="relative aspect-square w-full overflow-hidden rounded-md">
                          <img src={imageUrl} alt={`existing-${index}`} className="h-full w-full object-cover" />
                          <Button
                            variant="ghost"
                            size="2xsIcon"
                            type="button"
                            className="absolute top-3 right-3"
                            onClick={() => handleImageDelete(index, "existing")}
                            aria-label="이미지 삭제">
                            <img src={crossDeleteIcon} alt="이미지 삭제" />
                          </Button>
                        </div>
                      </CarouselItem>
                    ))}
                    {/* 새로 추가된 이미지 렌더링 */}
                    {newImages.map((image, index) => {
                      const objectUrl = URL.createObjectURL(image);
                      return (
                        <CarouselItem key={`new-${index}`} className="basis-[200px] pl-4">
                          <div className="relative aspect-square w-full overflow-hidden rounded-md">
                            <img
                              src={objectUrl}
                              alt={`preview-${index}`}
                              className="h-full w-full object-cover"
                              onLoad={() => URL.revokeObjectURL(objectUrl)}
                            />
                            <Button
                              variant="ghost"
                              size="2xsIcon"
                              type="button"
                              className="absolute top-3 right-3"
                              onClick={() => handleImageDelete(index, "new")}
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
