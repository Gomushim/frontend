import * as React from "react";
import { cn } from "../utils/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-green-300 focus-visible:ring-[1px] focus-visible:ring-green-300",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        error == false ? "border-red-0" : "border-gray-50",
        className
      )}
      {...props}
    />
  );
}

export { Input as SInput };
