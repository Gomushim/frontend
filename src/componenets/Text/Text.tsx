// src/components/Text.tsx
import { useRef, useState } from 'react';

type TextStatus = 'inactive' | 'typing' | 'error' | 'active';

interface TextProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  status?: TextStatus;
  className?: string;
  maxLength?: number;
}

const Text = ({
  value = '',
  onChange,
  placeholder = 'Text',
  status,
  className = '',
  maxLength = 15, 
}: TextProps) => {
  const textRef = useRef<HTMLInputElement>(null);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<TextStatus>('inactive'); // 상태 추적

  const handleBlur = () => {
    setHasBlurred(true);
  };

  const handleFocus = () => {
    setHasBlurred(false);
  };

  // 상태 감지
  const derivedStatus: TextStatus = (() => {
    if (status) return status;
    if (currentStatus === 'error') return 'error'; // error 상태 유지
    if (value.length === 0) return 'inactive'; // 초기 상태
    if (value.length > 0 && !hasBlurred) return 'typing'; // 타이핑하고 있을 때
    if (value.length > 0 && hasBlurred) return 'active'; // 타이핑 후 다른 곳 눌렀을 때
    return 'inactive';
  })();

  const getBorderStyle = () => {
    switch (derivedStatus) {
      case 'typing':
        return 'border-green-300';
      case 'error':
        return 'border-red-0'; 
      case 'active':
        return 'border-transparent';
      default:
        return 'border-transparent';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // 15자 이상이면 error 상태로 설정
    if (newValue.length > maxLength) {
      setCurrentStatus('error');
    } else {
      setCurrentStatus('inactive');
      onChange?.(newValue); 
    }
  };

  return (
    <div
      className={`flex items-center bg-gray-50 
        w-[21.8125rem] h-[3rem] 
        px-[1rem] py-[1rem] 
        rounded-[1rem] gap-[0.625rem] 
        border ${getBorderStyle()} ${className}`}
    >
      <input
        ref={textRef}
        type="text"
        className="w-full bg-transparent outline-none text-md text-gray-1000 placeholder:text-gray-400"
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

export default Text;
