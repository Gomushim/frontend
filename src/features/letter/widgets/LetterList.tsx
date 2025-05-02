import { LetterCard } from "./LetterCard";

export interface Letter {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  creationDate: Date;
}

export interface LetterListProps {
  letters: Letter[];
}
export const LetterList = (props: LetterListProps) => {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {props.letters.map(letter => (
        <LetterCard key={letter.id} {...letter} />
      ))}
    </ul>
  );
};
