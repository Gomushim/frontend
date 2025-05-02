export type Emoji = "HEART" | "CALENDAR" | "CAKE" | "TRAVEL";

export interface Dday {
  id: number;
  emoji: Emoji;
  title: string;
  anniversaryDate: string;
}

export interface DdayRequst {
  title: string;
  emoji: Emoji;
  date: string;
}

export interface NewDdayResponse {
  result: boolean;
}

export interface InitialDday {
  id: number | null;
  title: string;
  emoji: Emoji;
  date: string;
}

export interface DdayStore {
  dday: InitialDday;
  setTitle: (title: string) => void;
  setEmoji: (emoji: Emoji) => void;
  setDate: (date: string) => void;
  reset: () => void;
}
