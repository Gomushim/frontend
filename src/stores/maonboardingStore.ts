import { create } from "zustand";
import { maonboardingQueries } from "@/entities/maonboarding/service";
import { useCoupleStore } from "./coupleStore";

export type MilitaryBranch = "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE" | "";

interface OnboardingState {
  militaryBranch: MilitaryBranch;
  firstMeetDate: Date | null;
  enlistmentDate: Date | null;
  dischargeDate: Date | null;

  setMilitaryBranch: (branch: MilitaryBranch) => void;
  setFirstMeetDate: (date: Date | null) => void;
  setEnlistmentDate: (date: Date | null) => void;
  setDischargeDate: (date: Date | null) => void;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>(set => ({
  militaryBranch: "",
  firstMeetDate: null,
  enlistmentDate: null,
  dischargeDate: null,

  setMilitaryBranch: branch => set({ militaryBranch: branch }),
  setFirstMeetDate: date => set({ firstMeetDate: date }),
  setEnlistmentDate: date => set({ enlistmentDate: date }),
  setDischargeDate: date => set({ dischargeDate: date }),
  completeOnboarding: async () => {
    const state = useOnboardingStore.getState();
    if (!state.firstMeetDate || !state.enlistmentDate || !state.dischargeDate || !state.militaryBranch) {
      throw new Error("입력되지 않은 정보가 있어요");
    }

    // 날짜 유효성 검사
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (state.firstMeetDate > today) {
      throw new Error("만난 날짜는 오늘보다 이전이어야 합니다");
    }

    if (state.enlistmentDate > today) {
      throw new Error("입대일은 오늘보다 이전이어야 합니다");
    }

    if (state.dischargeDate > today) {
      throw new Error("전역일은 오늘보다 이전이어야 합니다");
    }

    if (state.dischargeDate <= state.enlistmentDate) {
      throw new Error("전역일은 입대일보다 이후여야 합니다");
    }

    if (state.enlistmentDate <= state.firstMeetDate) {
      throw new Error("입대일은 만난 날짜보다 이후여야 합니다");
    }

    try {
      const response = await maonboardingQueries.registerAnniversary({
        coupleId: 1, // TODO: 실제 coupleId를 가져오는 로직 필요
        relationshipStartDate: state.firstMeetDate.toISOString().split("T")[0],
        militaryStartDate: state.enlistmentDate.toISOString().split("T")[0],
        militaryEndDate: state.dischargeDate.toISOString().split("T")[0],
        military: state.militaryBranch as "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE",
      });
      
      if (response.result) {
        useCoupleStore.getState().setInitialized(true);
      }
    } catch (error) {
      console.error("온보딩 완료 중 오류 발생:", error);
      throw error;
    }
  },
  resetOnboarding: () =>
    set({
      militaryBranch: "",
      firstMeetDate: null,
      enlistmentDate: null,
      dischargeDate: null,
    }),
}));
