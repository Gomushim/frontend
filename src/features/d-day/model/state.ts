import { Emoji } from "@/entities/d-day";

export interface InitialDday {
  id: number | null;
  title: string;
  date: string;
  emoji: Emoji;
}
