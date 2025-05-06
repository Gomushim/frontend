import { useRef, useState } from "react";
import { InputProps, InputStatus } from "./input";

interface TextinputProps extends InputProps {
  maxLength?: number;
}

export const Textinput = ({
  value = "",
  onChange,
  placeholder = "Textinput",
  status,
  className = "",
  maxLength = 15,
}: TextinputProps) => {
  const textRef = useRef<HTMLInputElement>(null);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<InputStatus>("inactive"); // 상태 추적

  const handleBlur = () => {
    setHasBlurred(true);
  };

  const handleFocus = () => {
    setHasBlurred(false);
  };

  // 상태 감지
  const derivedStatus: InputStatus = (() => {
    if (status) return status;
    if (currentStatus === "error") return "error"; // error 상태 유지
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // 15자 이상이면 error 상태로 설정
    if (newValue.length > maxLength) {
      setCurrentStatus("error");
    } else {
      setCurrentStatus("inactive");
      onChange?.(newValue);
    }
  };

  return (
    <div
      className={`flex h-[3rem] w-full items-center gap-[0.625rem] rounded-[1rem] border bg-gray-50 px-[1rem] py-[1rem] ${getBorderStyle()} ${className}`}>
      <input
        ref={textRef}
        type="text"
        className="text-md text-gray-1000 w-full bg-transparent outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        maxLength={maxLength}
      />
      <span className="ml-2 text-sm text-gray-600">
        {value.length}/{maxLength}
      </span>
    </div>
  );
};
