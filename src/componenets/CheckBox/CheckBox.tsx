import { FC } from 'react';
import CheckedIcon from '@/assets/images/checked.svg';
import UncheckedIcon from '@/assets/images/unchecked.svg';

export interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CheckBox: FC<CheckBoxProps> = ({ checked, onChange, className, style }) => {
  return (
    <div
      onClick={onChange}
      style={{
        width: '1.4375rem',
        height: '1.4375rem',
        top: '1.25rem',
        left: '1.25rem',
        ...style,
      }}
      className={`absolute cursor-pointer ${className}`}
    >
      <img
        src={checked ? CheckedIcon : UncheckedIcon}
        alt={checked ? '체크됨' : '체크 안 됨'}
        className="w-full h-full"
      />
    </div>
  );
};

export default CheckBox;
