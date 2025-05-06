export type Emoji = "HEART" | "CALENDAR" | "CAKE" | "TRAVEL";

export interface Dday {
  id: number;
  emoji: Emoji;
  title: string;
  anniversaryDate: string;
}

// API 함수에 필요한 타입
export interface DdayRequst {
  title: string;
  emoji: Emoji;
  date: string;
}

export interface NewDdayResponse {
  result: boolean;
}

export interface DDayListResponse {
  data: Dday[];
  after: number;
  count: number;
  isLastPage: boolean;
}

export interface MainDdayListResponse {
  result: Dday[];
}

//전역상태 타입
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
