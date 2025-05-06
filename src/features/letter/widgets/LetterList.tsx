import { LetterList as LetterListType } from "@/entities/letter";
import { DetailLetterBottomSheet } from "./DetailLetterBottomSheet";

export interface LetterListProps {
  letters: LetterListType;
}
export const LetterList = (props: LetterListProps) => {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {props.letters.map(letter => (
        <DetailLetterBottomSheet key={letter.letterId} {...letter} />
      ))}
    </ul>
  );
};
