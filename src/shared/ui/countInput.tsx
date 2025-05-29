import * as React from "react";
import { SInput } from "./shadcnInput";
import { cn } from "../utils/lib/utils";
import { useState } from "react";

interface CountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
  containerClassName?: string;
}

export function CountInput({
  maxLength = 15,
  className,
  containerClassName,
  value = "",
  onChange,
  ...props
}: CountInputProps) {
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > maxLength) {
      setIsError(true);
    } else {
      setIsError(false);
      onChange?.(e);
    }
  };

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <SInput
        {...props}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        error={isError}
        className={cn("pr-16", className)} // 글자 수 표시 공간 확보
      />
      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-600">
        {typeof value === "string" ? value.length : 0}/{maxLength}
      </span>
    </div>
  );
}
