import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, SInput, Textarea } from "@/shared/ui";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import crossDeleteIcon from "@/assets/icons/crossDelete.svg";

export const WriteLetterBottomSheet = () => {
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 선택 시 처리
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 여러 파일 선택 가능하다고 가정
      const selectedFiles = Array.from(event.target.files);

      // 기존 이미지에 추가 (중복 허용 여부에 따라 다르게 처리 가능)
      setImages(prev => [...prev, ...selectedFiles]);
    }
  };

  // 이미지 삭제 (예: 첫 번째 이미지 삭제)
  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // 파일 선택창 열기 함수
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 페이지 리로드 막기

    const form = event.currentTarget;
    const formData = new FormData(form);

    // 이미지 파일도 FormData에 추가
    images.forEach(file => {
      formData.append("images", file);
    });

    // 예: formData 내용 확인 (디버깅용)
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // TODO: formData를 서버에 POST 요청 보내는 코드 작성
    // 예: fetch('/api/letter', { method: 'POST', body: formData })

    alert("폼이 제출되었습니다.");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="square" size="2xs">
          편지 작성하기
        </Button>
      </DrawerTrigger>
      <DrawerContent className="py10 px-5">
        <form className="mx-auto w-full max-w-sm" onSubmit={handleSubmit}>
          <DrawerHeader className="flex-row justify-between px-0">
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-gray-0 p-0 text-sm font-semibold text-green-600 hover:text-green-700">
              취소
            </Button>
            <DrawerTitle>2025년 6월 5일 목요일</DrawerTitle>
            <Button
              type="submit"
              variant="ghost"
              className="hover:bg-gray-0 p-0 text-sm font-semibold text-green-600 hover:text-green-700">
              완료
            </Button>
          </DrawerHeader>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-gray-900" htmlFor="title">
                제목
              </label>
              <SInput className="bg-gray-50" id="title" type="text" placeholder="제목을 입력해 주세요" maxLength={20} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-gray-900" htmlFor="content">
                내용
              </label>
              <Textarea
                className="min-h-[140px] bg-gray-50 p-3 focus-visible:border-green-300 focus-visible:ring-green-300"
                id="content"
                placeholder="내용을 입력해 주세요"
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
                  onChange={handleImageChange}
                />
              </div>

              {images.length > 0 ? (
                <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                  <CarouselContent>
                    {images.map((image, index) => {
                      const objectUrl = URL.createObjectURL(image);
                      return (
                        <CarouselItem key={index} className="relative md:basis-1/2 lg:basis-1/2">
                          <div className="p-1">
                            <img
                              src={objectUrl}
                              alt={`preview-${index}`}
                              className="h-50 w-50 rounded-md object-cover"
                              onLoad={() => URL.revokeObjectURL(objectUrl)} // 메모리 해제
                            />
                            <Button
                              variant="ghost"
                              size="2xsIcon"
                              type="button"
                              className="absolute top-3 right-3"
                              onClick={() => handleRemoveImage(index)}
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
