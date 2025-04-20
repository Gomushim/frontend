import React from "react";
import clsx from "clsx";

export type ButtonVariant = "inactive" | "active" | "pressed" | "special";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ text, variant = "active", className, ...props }) => {
  const baseClasses = `
    w-full h-14 rounded-xl
    px-6 py-3
    flex items-center justify-center gap-2.5
    text-xl font-semibold
    transition-colors duration-200
    whitespace-nowrap
  `;

  const variantClasses: Record<ButtonVariant, string> = {
    inactive: "bg-gray-200 text-gray-0",
    active: "bg-green-500 text-gray-0",
    pressed: "bg-green-600 text-gray-0",
    special: "bg-green-100 text-green-500",
  };

  return (
    <button className={clsx(baseClasses, variantClasses[variant], className)} {...props}>
      {text}
    </button>
  );
};

export default Button;
