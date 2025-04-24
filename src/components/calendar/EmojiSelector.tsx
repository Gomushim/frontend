import { useState } from "react";
import heart from "@/assets/icons/heart.svg";
import calendar from "@/assets/icons/calendar.svg";
import cake from "@/assets/icons/cake.svg";
import taravel from "@/assets/icons/taravel.svg";
import { Button } from "@/components/ui/button";

const icons = [
  { id: "heart", src: heart, alt: "사랑 아이콘" },
  { id: "calendar", src: calendar, alt: "일정 아이콘" },
  { id: "cake", src: cake, alt: "생일 아이콘" },
  { id: "taravel", src: taravel, alt: "여행 아이콘" },
];

export const EmojiSelector = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedEmoji(id);
  };

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
          onClick={() => handleSelect(id)}>
          <img src={src} alt={alt} />
        </Button>
      ))}
    </div>
  );
};
