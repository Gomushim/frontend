import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'lightGray' | 'darkGray' | 'darkerGray' | 'pink';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'lightGray',
  className,
  ...props
}) => {
  const baseClasses = `
    w-[21.875rem] h-[3.5rem] rounded-[1rem]
    px-[10rem] py-[1.125rem]
    flex items-center justify-center gap-[0.625rem]
    text-xl font-semibold
    transition-colors duration-200
    whitespace-nowrap
  `;

  const variantClasses: Record<ButtonVariant, string> = {
    lightGray: 'bg-gray-200 text-gray-0',
    darkGray: 'bg-gray-900 text-gray-0',
    darkerGray: 'bg-gray-1000 text-gray-0',
    pink: 'bg-pink-200 text-red-500',
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
