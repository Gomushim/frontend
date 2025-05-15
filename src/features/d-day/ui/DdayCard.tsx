import { InfoCard } from "@/shared/ui";
import { calculateDday } from "@/shared/utils";
import type { Dday } from "@/entities/d-day";

interface DdayCardProps extends Dday {
  className?: string;
  onClick?: () => void;
}

export const DdayCard = (props: DdayCardProps) => {
  return (
    <InfoCard className={`justify-between bg-gray-50 ${props.className}`}>
      <InfoCard.Content>
        <InfoCard.Title>{props.title}</InfoCard.Title>
        <div className="flex flex-col gap-1 text-end">
          <InfoCard.Title>{calculateDday(props.anniversaryDate)}</InfoCard.Title>
          <InfoCard.Text>{props.anniversaryDate}</InfoCard.Text>
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
