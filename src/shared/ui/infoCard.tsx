import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/shared/utils/lib/utils";

interface InfoCardProps {
  children: ReactNode;
  barColor?: string; // ex: '#1F2937', '#00FF00'
  circleColor?: string;
  className?: string;
  selected?: string;
  onClick?: () => void;
}

interface InfoCardContentProps {
  children: ReactNode;
  className?: string;
}

interface InfoCardTagProps {
  children: ReactNode;
  tagColor?: string;
  textColor?: string;
  className?: string;
}

interface InfoCardTitleProps {
  children: ReactNode;
  className?: string;
}

interface InfoCardTimeProps {
  children: ReactNode;
  className?: string;
}

interface InfoCardLabelProps {
  children: ReactNode;
  className?: string;
}

interface InfoCardImageProps {
  imageUrl: string;
  className?: string;
}

interface OptionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

interface InfoCardArrowButtonProps {
  direction?: "left" | "right"; // 선택적, 기본 "right"
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

interface IconTitleProps {
  iconSrc: string;
  alt?: string;
  children: ReactNode;
  className?: string;
}

export const InfoCard = ({ children, barColor, circleColor, className, selected, onClick }: InfoCardProps) => {
  return (
    <li
      className={cn(
        `flex cursor-pointer items-center justify-between rounded-2xl bg-white px-4 py-3 ${selected}`,
        className
      )}
      onClick={onClick}>
      {barColor && <div className={`mr-4 h-12 w-1 rounded-full ${barColor}`} />}
      {circleColor && <div className={`mr-5 h-9 w-11 rounded-full ${circleColor}`} />}
      {/* <div className="flex w-full justify-between"></div> */}
      {children}
    </li>
  );
};

const Content = ({ className, children }: InfoCardContentProps) => {
  return <div className={cn("flex w-full justify-between", className)}>{children}</div>;
};

const Tag = ({ children, className, tagColor, textColor }: InfoCardTagProps) => (
  <div
    className={cn(
      "inline-flex items-center justify-center rounded-full bg-green-700 px-2 py-0.5 text-[10px] font-bold text-white",
      tagColor,
      textColor,
      className
    )}>
    {children}
  </div>
);

const Title = ({ children, className }: InfoCardTitleProps) => (
  <p className={cn("text-base font-bold text-gray-900", className)}>{children}</p>
);

const Text = ({ children, className }: InfoCardLabelProps) => {
  return <p className={cn("text-sm font-medium text-gray-500", className)}>{children}</p>;
};

const IconTitle = ({ iconSrc, alt = "icon", children, className }: IconTitleProps) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      <img src={iconSrc} alt={alt} className="h-5 w-5 flex-shrink-0" />
      <p className="text-base font-semibold text-gray-900">{children}</p>
    </div>
  );
};

const Time = ({ children, className }: InfoCardTimeProps) => (
  <div className={cn("text-sm text-gray-700", className)}>{children}</div>
);

const Label = ({ children, className }: InfoCardLabelProps) => {
  return <p className={cn("inline-block rounded-md px-2 py-0.5 text-sm font-medium", className)}>{children}</p>;
};

const Image = ({ imageUrl, className }: InfoCardImageProps) => {
  return <img src={imageUrl} alt="썸네일" className={cn("h-17 w-17 rounded-md object-cover", className)} />;
};

const ArrowButton = ({ direction = "right", onClick, className }: InfoCardArrowButtonProps) => {
  const directionClass = direction === "left" ? "rotate-180" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-full cursor-pointer items-center justify-center border-none bg-transparent p-0",
        directionClass,
        className
      )}
      aria-label={direction === "left" ? "이전" : "다음"}>
      <img src="@/assets/icons/infoCardArrow.svg" alt="화살표 버튼" className="block" />
    </button>
  );
};

const OptionButtons = ({ onEdit, onDelete, className }: OptionButtonsProps) => {
  return (
    <div className={cn("flex items-end gap-1 text-sm leading-[150%] font-medium text-gray-400", className)}>
      <button
        type="button"
        onClick={onEdit}
        className="m-0 cursor-pointer bg-transparent p-0 hover:text-gray-600 focus:outline-none">
        편집
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        onClick={onDelete}
        className="m-0 cursor-pointer bg-transparent p-0 hover:text-gray-600 focus:outline-none">
        삭제
      </button>
    </div>
  );
};

InfoCard.Content = Content;
InfoCard.Tag = Tag;
InfoCard.Title = Title;
InfoCard.Text = Text;
InfoCard.Image = Image;
InfoCard.IconTitle = IconTitle;
InfoCard.Time = Time;
InfoCard.Label = Label;
InfoCard.ArrowButton = ArrowButton;
InfoCard.Option = OptionButtons;
