import { create } from "zustand";
import { maonboardingQueries } from "@/entities/axios/maonboarding/queries";

export type MilitaryBranch = "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE" | "";

interface OnboardingState {
  militaryBranch: MilitaryBranch;
  firstMeetDate: Date | null;
  enlistmentDate: Date | null;
  dischargeDate: Date | null;
  isOnboardingComplete: boolean;

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
  isOnboardingComplete: false,

  setMilitaryBranch: branch => set({ militaryBranch: branch }),
  setFirstMeetDate: date => set({ firstMeetDate: date }),
  setEnlistmentDate: date => set({ enlistmentDate: date }),
  setDischargeDate: date => set({ dischargeDate: date }),
  completeOnboarding: async () => {
    const state = useOnboardingStore.getState();
    if (!state.firstMeetDate || !state.enlistmentDate || !state.dischargeDate || !state.militaryBranch) {
      throw new Error("모든 필수 정보가 입력되지 않았습니다.");
    }

    try {
      await maonboardingQueries.registerAnniversary({
        coupleId: 1, // TODO: 실제 coupleId를 가져오는 로직 필요
        relationshipStartDate: state.firstMeetDate.toISOString().split("T")[0],
        militaryStartDate: state.enlistmentDate.toISOString().split("T")[0],
        militaryEndDate: state.dischargeDate.toISOString().split("T")[0],
        military: state.militaryBranch as "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE",
      });
      set({ isOnboardingComplete: true });
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
      isOnboardingComplete: false,
    }),
}));
