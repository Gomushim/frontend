import { DetailLetterBottomSheet } from "./DetailLetterBottomSheet";

export interface Letter {
  letterId: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export interface LetterListProps {
  letters: Letter[];
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
