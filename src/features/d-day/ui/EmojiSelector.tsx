import { Emoji } from "@/entities/d-day/model/types";
import heart from "@/assets/icons/heart.svg";
import calendar from "@/assets/icons/calendar.svg";
import cake from "@/assets/icons/cake.svg";
import taravel from "@/assets/icons/travel.svg";
import { Button } from "@/shared/ui";

interface EmojiSelectorProps {
  selectedEmoji: Emoji;
  onEmojiChange: (emoji: Emoji) => void;
}

const icons = [
  { id: Emoji.HEART, src: heart, alt: "사랑 아이콘" },
  { id: Emoji.CALENDAR, src: calendar, alt: "일정 아이콘" },
  { id: Emoji.CAKE, src: cake, alt: "생일 아이콘" },
  { id: Emoji.TRAVEL, src: taravel, alt: "여행 아이콘" },
];

export const EmojiSelector = ({ selectedEmoji, onEmojiChange }: EmojiSelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      {icons.map(({ id, src, alt }) => (
        <Button
          key={id}
          variant="secondary"
          size="icon"
          className={`rounded-2xl bg-gray-50 ${
            selectedEmoji === id ? "border-2 border-green-500" : "border border-transparent"
          }`}
          onClick={() => onEmojiChange(id)}>
          <img src={src} alt={alt} />
        </Button>
      ))}
    </div>
  );
};
