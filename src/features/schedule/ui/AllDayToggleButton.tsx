import { Switch } from "@/shared/ui";

interface AllDayToggleButtonProps {
  isAllDay: boolean;
  onToggle: (value: boolean) => void;
}

export const AllDayToggleButton = ({ isAllDay, onToggle }: AllDayToggleButtonProps) => {
  return (
    <Switch
      id="airplane-mode"
      className="checked:bg-green-500"
      checked={isAllDay}
      onClick={() => onToggle(!isAllDay)}
    />
  );
};
