export interface Dday {
  id: number;
  title: string;
  anniversaryDate: string;
}

// API 함수에 필요한 타입
export interface DdayRequst {
  title: string;
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
  date: string;
}
