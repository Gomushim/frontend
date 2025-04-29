import { create } from "zustand";
import { coupleNicknameQueries } from "@/entities/couple_nickname/service";
import { iscoupleQueries } from "@/entities/iscouple/service";

interface CoupleState {
  isConnected: boolean;
  isInitialized: boolean;
  coupleInfo: {
    userNickname: string;
    coupleNickname: string;
  };
  isLoading: boolean;
  setConnected: (isConnected: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setCoupleInfo: (coupleInfo: { userNickname: string; coupleNickname: string }) => void;
  fetchCoupleStatus: () => Promise<void>;
  fetchCoupleNicknames: () => Promise<void>;
}

export const useCoupleStore = create<CoupleState>(set => ({
  isConnected: false,
  isInitialized: false,
  coupleInfo: {
    userNickname: "",
    coupleNickname: "",
  },
  isLoading: false,
  setConnected: isConnected => set({ isConnected }),
  setInitialized: isInitialized => set({ isInitialized }),
  setCoupleInfo: coupleInfo => set({ coupleInfo }),
  fetchCoupleStatus: async () => {
    try {
      const response = await iscoupleQueries.checkCoupleConnect();
      set({ isConnected: response.result });
    } catch (error) {
      console.error("커플 상태 조회 실패:", error);
      set({ isConnected: false });
    }
  },
  fetchCoupleNicknames: async () => {
    try {
      set({ isLoading: true });
      const response = await coupleNicknameQueries.getNickName();
      set({
        coupleInfo: {
          userNickname: response.result.userNickname,
          coupleNickname: response.result.coupleNickname,
        },
      });
    } catch (error) {
      console.error("닉네임 조회 실패:", error);
      set({ 
        coupleInfo: {
          userNickname: "",
          coupleNickname: "",
        }
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
