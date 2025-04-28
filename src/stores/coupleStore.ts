import { create } from "zustand";

interface CoupleState {
  isConnected: boolean;
  isInitialized: boolean;
  coupleInfo: {
    userNickname: string;
    coupleNickname: string;
  };
  setConnected: (isConnected: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setCoupleInfo: (coupleInfo: { userNickname: string; coupleNickname: string }) => void;
}

export const useCoupleStore = create<CoupleState>(set => ({
  isConnected: true,
  isInitialized: true,
  coupleInfo: {
    userNickname: "",
    coupleNickname: "",
  },
  setConnected: isConnected => set({ isConnected }),
  setInitialized: isInitialized => set({ isInitialized }),
  setCoupleInfo: coupleInfo => set({ coupleInfo }),
}));
