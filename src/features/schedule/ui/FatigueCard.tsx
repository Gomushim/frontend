import { InfoCard } from "@/shared/ui";

interface StatusCardProps {
  fatigue: "VERY_TIRED" | "TIRED" | "GOOD";
  selected: boolean;
  onClick?: () => void;
}

const statusMap: Record<
  string,
  { bgColor: string; textColor: string; borderColor: string; description: string; text: string }
> = {
  VERY_TIRED: {
    bgColor: "bg-red-0",
    textColor: "text-red-0",
    borderColor: "border-red-0",
    description: "충분한 휴식이 필요한 일정이에요",
    text: "매우 피곤해요",
  },
  TIRED: {
    bgColor: "bg-green-300",
    textColor: "text-green-300",
    borderColor: "border-green-300",
    description: "반나절 정도의 휴식이 필요한 상황이에요",
    text: "조금 피곤해요",
  },
  GOOD: {
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    borderColor: "border-green-500",
    description: "남은 하루도 잘 보낼 수 있는 일정이에요",
    text: "괜찮아요",
  },
};

export const FatigueCard = ({ fatigue, selected, onClick }: StatusCardProps) => {
  const defaultStyle = {
    bgColor: "bg-gray-400",
    textColor: "text-gray-400",
    borderColor: "border-transparent",
  };

  const { bgColor, textColor, borderColor, description, text } = statusMap[fatigue] ?? defaultStyle;

  const cardBorderColor = selected ? borderColor : defaultStyle.borderColor;

  return (
    <InfoCard
      circleColor={bgColor}
      selected={selected ? cardBorderColor : ""}
      className={`justify-between border px-4 py-5 ${cardBorderColor} cursor-pointer rounded-md bg-gray-50`}
      onClick={onClick}>
      <InfoCard.Content>
        <div className="flex flex-col">
          <InfoCard.Title className={textColor}>{text}</InfoCard.Title>
          <InfoCard.Text>{description}</InfoCard.Text>
        </div>
      </InfoCard.Content>
    </InfoCard>
  );
};
