import { DateText, InfoCard } from "@/shared/ui";

interface LetterCardProps {
  id: number;
  title: string;
  creationDate: Date | string;
  imageUrl?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LetterCard = (props: LetterCardProps) => {
  const images = props.imageUrl ?? [];
  const imageCount = images.length;

  return (
    <InfoCard className="">
      <InfoCard.Content className="flex-col gap-4">
        <InfoCard.Title>{props.title}</InfoCard.Title>

        {/* 이미지 영역 */}
        {imageCount > 0 && imageCount <= 4 && (
          <div className="mb-2 h-30 overflow-hidden">
            {imageCount === 1 && (
              <img src={images[0]} alt="letter image" className="h-full w-full rounded-md object-cover" />
            )}

            {imageCount === 2 && (
              <div className="flex h-30 gap-1 overflow-hidden">
                {images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`letter image ${idx + 1}`}
                    className="h-full w-1/2 rounded-md object-cover"
                  />
                ))}
              </div>
            )}

            {imageCount === 3 && (
              <div className="flex h-30 flex-col gap-1 overflow-hidden">
                <img src={images[0]} alt="letter image 1" className="h-1/2 w-full rounded-md object-cover" />
                <div className="flex h-1/2 gap-1">
                  <img src={images[1]} alt="letter image 2" className="w-1/2 rounded-md object-cover" />
                  <img src={images[2]} alt="letter image 3" className="w-1/2 rounded-md object-cover" />
                </div>
              </div>
            )}

            {imageCount === 4 && (
              <div className="grid h-30 grid-cols-2 grid-rows-2 gap-1 overflow-hidden">
                {images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`letter image ${idx + 1}`}
                    className="h-full w-full rounded-md object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between">
          <DateText date={props.creationDate} />
          <InfoCard.Option />
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
