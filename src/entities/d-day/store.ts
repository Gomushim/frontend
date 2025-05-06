import { create } from "zustand";
import { DdayStore, InitialDday } from "./type";

// 초기 상태
const initialState: InitialDday = {
  id: null,
  title: "",
  emoji: "CALENDAR",
  date: "",
};

// Zustand 스토어 생성
export const useDdayStore = create<DdayStore>(set => ({
  dday: initialState,
  setTitle: title => set(state => ({ dday: { ...state.dday, title } })),
  setEmoji: emoji => set(state => ({ dday: { ...state.dday, emoji } })),
  setDate: date => set(state => ({ dday: { ...state.dday, date } })),
  reset: () => set({ dday: initialState }),
}));
