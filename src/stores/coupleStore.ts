import { create } from "zustand";
import { coupleNicknameQueries } from "@/entities/couple_nickname/service";
import { maonboardingQueries } from "@/entities/maonboarding/service";

interface CoupleState {
  coupleInfo: {
    userNickname: string;
    coupleNickname: string;
  };
  isLoading: boolean;
  isInitialized: boolean;
  setCoupleInfo: (coupleInfo: { userNickname: string; coupleNickname: string }) => void;
  fetchCoupleNicknames: () => Promise<void>;
  fetchInitializationStatus: () => Promise<void>;
}

export const useCoupleStore = create<CoupleState>(set => ({
  coupleInfo: {
    userNickname: "",
    coupleNickname: "",
  },
  isLoading: false,
  isInitialized: false,
  setCoupleInfo: coupleInfo => set({ coupleInfo }),
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
  fetchInitializationStatus: async () => {
    try {
      const response = await maonboardingQueries.getCoupleInfo();
      set({ isInitialized: response.result.isAnniversariesRegistered });
    } catch (error) {
      console.error("초기화 상태 조회 실패:", error);
      set({ isInitialized: false });
    }
  },
}));
