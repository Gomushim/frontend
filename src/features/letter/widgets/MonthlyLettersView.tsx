import type { LetterList as LetterListType } from "@/entities/letter";
import { LetterList } from "@/features/letter";

interface LetterListPageProps {
  letters: LetterListType;
}

const groupLettersByMonth = (letters: LetterListType) => {
  const groups: Record<string, { year: number; month: number; letters: LetterListType }> = {};

  letters.forEach(letter => {
    const date = letter.creationDate;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const key = `${year}-${month}`;
    if (!groups[key]) groups[key] = { year, month, letters: [] };
    groups[key].letters.push(letter);
  });

  return Object.values(groups).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
};

const formatYearMonth = (year: number, month: number) => `${year}년 ${month}월`;

export const MonthlyLettersView = ({ letters }: LetterListPageProps) => {
  const groupedLetters = groupLettersByMonth(letters);

  return (
    <section>
      {groupedLetters.map(({ year, month, letters }) => (
        <div key={`${year}-${month}`} className="mb-8">
          <h2 className="text-md mb-3 text-center font-semibold text-gray-900">{formatYearMonth(year, month)}</h2>
          <LetterList letters={letters} />
        </div>
      ))}
    </section>
  );
};
