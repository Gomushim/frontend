import { CountInput } from "@/shared/ui";
import { memo } from "react";

interface TitleInputProps {
  value: string;
  onTitleChange: (title: string) => void;
}

export const TitleInput = memo(({ value, onTitleChange }: TitleInputProps) => {
  return (
    <>
      <label htmlFor="title" className="text-gary-900 text-xl font-semibold">
        제목
      </label>
      <CountInput
        id="title"
        className="h-12 w-full border"
        type="text"
        value={value}
        onChange={e => onTitleChange(e.target.value)}
        maxLength={10}
      />
    </>
  );
});
