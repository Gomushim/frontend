import { Emoji } from "@/entities/d-day";

export interface InitialDday {
  id: string | null;
  title: string;
  date: string;
  emoji: Emoji;
}
