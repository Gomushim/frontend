// src/components/Input.tsx
import { useRef, useState } from "react";
import DeleteIcon from "@/assets/images/delete.svg";

export type InputStatus = "inactive" | "typing" | "error" | "active";

export interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  status?: InputStatus;
  onClear?: () => void;
  className?: string;
}

export const Input = ({ value = "", onChange, placeholder = "Input", status, onClear, className = "" }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleClear = () => {
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setHasBlurred(true);
  };

  const handleFocus = () => {
    setHasBlurred(false);
  };

  // 상태 감지
  const derivedStatus: InputStatus = (() => {
    if (status) return status;
    if (value.length === 0) return "inactive"; // 초기 상태
    if (value.length > 0 && !hasBlurred) return "typing"; // 타이핑하고 있을 때
    if (value.length > 0 && hasBlurred) return "active"; // 타이핑 후 다른 곳 눌렀을 때
    return "inactive";
  })();

  const getBorderStyle = () => {
    switch (derivedStatus) {
      case "typing":
        return "border-green-300";
      case "error":
        return "border-red-0";
      case "active":
        return "border-transparent";
      default:
        return "border-transparent";
    }
  };

  return (
    <div
      className={`flex h-[3.375rem] w-full items-center gap-[0.625rem] rounded-[1rem] border bg-gray-50 px-[1.25rem] py-[1rem] ${getBorderStyle()} ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className="text-md text-gray-1000 w-full bg-transparent outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <button onClick={handleClear} type="button" aria-label="Clear input">
        <img src={DeleteIcon} alt="삭제" className="h-5 w-5 object-contain" />
      </button>
    </div>
  );
};
