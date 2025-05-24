import { LetterList as LetterListType } from "@/entities/letter";
import { LetterCard } from "./LetterCard";

export interface LetterListProps {
  letters: LetterListType;
}
export const LetterList = (props: LetterListProps) => {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {props.letters.map(letter => (
        <LetterCard key={letter.letterId} {...letter} />
      ))}
    </ul>
  );
};
