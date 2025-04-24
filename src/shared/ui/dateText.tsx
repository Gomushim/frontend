import { cn } from "@/shared/utils/lib/utils";

interface DateTextProps {
  date: Date | string;
  className?: string;
}
export const DateText = ({ date, className }: DateTextProps) => {
  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  };

  const isString = typeof date === "string";
  const displayText = isString ? date : formatDate(date);

  // ISO 문자열은 Date 객체일 때만 사용
  const dateTimeAttr = !isString && date instanceof Date ? date.toISOString() : undefined;

  return (
    <time dateTime={dateTimeAttr} className={cn("text-sm leading-[150%] font-medium text-gray-400", className)}>
      {displayText}
    </time>
  );
};
