import InfoCard from "../ui/InCard";

interface StatusCardProps {
  status: string;
  selected: boolean;
  onClick?: () => void;
}

const statusMap: Record<string, { bgColor: string; textColor: string; borderColor: string; description: string }> = {
  "매우 피곤해요": {
    bgColor: "bg-red-0",
    textColor: "text-red-0",
    borderColor: "border-red-0",
    description: "충분한 휴식이 필요한 일정이에요",
  },
  "조금 피곤해요": {
    bgColor: "bg-green-300",
    textColor: "text-green-300",
    borderColor: "border-green-300",
    description: "반나절 정도의 휴식이 필요한 상황이에요",
  },
  괜찮아요: {
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    borderColor: "border-green-500",
    description: "남은 하루도 잘 보낼 수 있는 일정이에요",
  },
};

export const StatusCard = ({ status, selected, onClick }: StatusCardProps) => {
  const defaultStyle = {
    bgColor: "bg-gray-400",
    textColor: "text-gray-400",
    borderColor: "border-transparent",
  };

  const { bgColor, textColor, borderColor, description } = statusMap[status] ?? defaultStyle;

  const cardBgColor = selected ? bgColor : defaultStyle.bgColor;
  const cardTextColor = selected ? textColor : defaultStyle.textColor;
  const cardBorderColor = selected ? borderColor : defaultStyle.borderColor;

  return (
    <InfoCard
      circleColor={cardBgColor}
      selected={selected ? cardBorderColor : ""}
      className={`justify-between border px-4 py-5 ${cardBorderColor} cursor-pointer rounded-md bg-gray-50`}
      onClick={onClick}>
      <div className="flex flex-col">
        <InfoCard.Title className={cardTextColor}>{status}</InfoCard.Title>
        <InfoCard.Text className={cardTextColor}>{description}</InfoCard.Text>
      </div>
    </InfoCard>
  );
};
