import type { LetterListResponse } from "@/entities/letter";
import { LetterList } from "@/features/letter";
import { groupLettersByMonth } from "../utils";
import { formatYearMonth } from "@/shared/utils";

export const MonthlyLettersView = (props: LetterListResponse) => {
  const groupedLetters = groupLettersByMonth(props.data);

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
