export interface Dday {
  id: number;
  emoji: "HEART" | "CALENDAR" | "CAKE" | "TRAVEL";
  title: string;
  date: Date;
}

export interface DdayRequst {
  id: number | null;
  title: string;
  emoji: "HEART" | "CALENDAR" | "CAKE" | "TRAVEL";
  date: string;
}

export interface NewDdayResponse {
  result: boolean;
}
