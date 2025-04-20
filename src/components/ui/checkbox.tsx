// components/ui/checkbox.tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import CheckedIcon from "@/assets/images/checked.svg";
import UncheckedIcon from "@/assets/images/unchecked.svg";

import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  className?: string;
  style?: React.CSSProperties;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, style, ...props }) => {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "relative size-[1.4375rem] cursor-pointer rounded-[4px] transition-colors",
        "bg-gray-50 data-[state=checked]:bg-green-500",
        className
      )}
      style={style}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="absolute inset-0 flex items-center justify-center">
        <img
          src={props.checked ? CheckedIcon : UncheckedIcon}
          alt={props.checked ? "체크됨" : "체크 안 됨"}
          className="h-full w-full"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export { Checkbox };
