import { InfoCard } from "@/shared/ui";
import { calculateDday } from "@/shared/utils";

interface CalendrDdayCardProps {
  id: number;
  title: string;
  anniversaryDate: string;
  className?: string;
}

export const CalendrDdayCard = (props: CalendrDdayCardProps) => {
  return (
    <InfoCard barColor="bg-[#FFE875]" className={`justify-between ${props.className}`}>
      <InfoCard.Content>
        <div className="flex flex-col gap-1">
          <InfoCard.Tag tagColor="bg-[#FFE875]" textColor="text-[#7B6901]">
            디데이
          </InfoCard.Tag>
          <InfoCard.Title>{props.title}</InfoCard.Title>
        </div>
        <div className="flex flex-col gap-1 text-end">
          <InfoCard.Title>{calculateDday(props.anniversaryDate)}</InfoCard.Title>
          <InfoCard.Text>{props.anniversaryDate}</InfoCard.Text>
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
