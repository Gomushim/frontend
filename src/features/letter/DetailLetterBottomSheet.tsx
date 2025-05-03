import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { LetterCard } from "./widgets";
import { useGetLetterDetail } from "@/entities/letter/query";
import { useParams } from "react-router";

interface DetailLetterBottomSheetProps {
  letterId: string;
  title: string;
  content: string;
  creationDate: Date | string;
  imageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const DetailLetterBottomSheet = (props: DetailLetterBottomSheetProps) => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { data: letterDetailData } = useGetLetterDetail(scheduleId || "", props.letterId);

  if (!letterDetailData) {
    return;
  }

  return (
    <Drawer>
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
            className="hover:bg-gray-0 p-0 text-sm font-semibold text-green-600 hover:text-green-700">
            취소
          </Button>
          <DrawerTitle>2025년 6월 5일 목요일</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-7">
          <p className="flex items-center rounded-xl bg-gray-50 p-3 text-base font-normal break-words text-gray-900">
            {letterDetailData?.result.letter.title}
          </p>
          <p className="rounded-xl bg-gray-50 p-3 text-base font-normal break-words text-gray-900">
            {letterDetailData?.result.letter.content}sdfkjsndf;klnsdlfnsldfnsdl;fnasldfnlasdnflas;dnfl;asdnflsanflsadnl
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};
