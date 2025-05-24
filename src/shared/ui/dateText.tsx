import { cn } from "@/shared/utils/lib/utils";
import { formatDateDot, formatDateFull } from "../utils";

interface DateTextProps {
  date: Date | string;
  className?: string;
  formatType?: "full" | "dot"; // full: yyyy.mm.dd hh:mm, dot: yyyy. mm. dd
}

export const DateText = ({ date, className, formatType = "full" }: DateTextProps) => {
  const isString = typeof date === "string";

  const displayText = isString ? date : formatType === "dot" ? formatDateDot(date) : formatDateFull(date);

  const dateTimeAttr = !isString && date instanceof Date ? date.toISOString() : undefined;

  return (
    <time dateTime={dateTimeAttr} className={cn("text-sm leading-[150%] font-medium text-gray-400", className)}>
      {displayText}
    </time>
  );
};
