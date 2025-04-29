import { DateText, InfoCard } from "@/shared/ui";
import heart from "@/assets/icons/heart.svg";
import calendar from "@/assets/icons/calendar.svg";
import cake from "@/assets/icons/cake.svg";
import travel from "@/assets/icons/travel.svg";
import { calculateDday } from "@/shared/utils";
import type { Dday } from "@/entities/d-day";

interface DdayCardProps extends Dday {
  onClick?: () => void;
}

const emojiIconMap: Record<string, string> = {
  HEART: heart,
  CALENDAR: calendar,
  CAKE: cake,
  TRAVEL: travel,
};

export const DdayCard = (props: DdayCardProps) => {
  const iconSrc = emojiIconMap[props.emoji];
  return (
    <InfoCard className="justify-between bg-gray-50">
      <InfoCard.Content>
        <InfoCard.IconTitle iconSrc={iconSrc}>{props.title}</InfoCard.IconTitle>
        <div className="flex flex-col gap-1 text-end">
          <InfoCard.Title>{calculateDday(props.date)}</InfoCard.Title>
          <DateText date={props.date} formatType="dot" />
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
