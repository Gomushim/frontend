import type { LetterList } from "@/entities/letter";

type LetterGroupsType = {
  year: number;
  month: number;
  letters: LetterList;
};

export const groupLettersByMonth = (letters: LetterList) => {
  const letterGroups: Record<string, LetterGroupsType> = {};

  letters.forEach(letter => {
    const date = letter.creationDate;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const key = `${year}-${month}`;
    if (!letterGroups[key]) letterGroups[key] = { year, month, letters: [] };
    letterGroups[key].letters.push(letter);
  });

  return Object.values(letterGroups).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
};
