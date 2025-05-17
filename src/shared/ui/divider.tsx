import { cn } from "@/shared/utils/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: string; // 예: "h-px", "w-0.5" (Tailwind 클래스)
  color?: string; // 예: "bg-gray-300"
  className?: string;
}

export const Divider = ({
  orientation = "horizontal",
  thickness = "h-px",
  color = "bg-gray-300",
  className,
}: DividerProps) => {
  const baseClass = cn(color, className, orientation === "horizontal" ? thickness + " w-full" : thickness + " h-full");

  return <div className={baseClass} aria-hidden="true" />;
};
