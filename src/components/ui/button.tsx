// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xl font-semibold transition-colors duration-200 px-6 py-3 h-14 w-full disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500",
  {
    variants: {
      variant: {
        inactive: "bg-gray-200 text-gray-0",
        active: "bg-green-500 text-gray-0",
        pressed: "bg-green-600 text-gray-0",
        special: "bg-green-100 text-green-500",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ className, variant, asChild = false, text, ...props }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant }), className)} {...props}>
      {text}
    </Comp>
  );
};

export { Button };
