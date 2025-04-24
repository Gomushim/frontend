import { create } from 'zustand';

export type MilitaryBranch = 'ARMY' | 'NAVY' | 'AIR_FORCE' | 'MARINE' | '';

interface OnboardingState {
  militaryBranch: MilitaryBranch;
  firstMeetDate: Date | null;
  enlistmentDate: Date | null;
  dischargeDate: Date | null;
  isOnboardingComplete: boolean;
  
  // Actions
  setMilitaryBranch: (branch: MilitaryBranch) => void;
  setFirstMeetDate: (date: Date | null) => void;
  setEnlistmentDate: (date: Date | null) => void;
  setDischargeDate: (date: Date | null) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  militaryBranch: '',
  firstMeetDate: null,
  enlistmentDate: null,
  dischargeDate: null,
  isOnboardingComplete: false,

  setMilitaryBranch: (branch) => set({ militaryBranch: branch }),
  setFirstMeetDate: (date) => set({ firstMeetDate: date }),
  setEnlistmentDate: (date) => set({ enlistmentDate: date }),
  setDischargeDate: (date) => set({ dischargeDate: date }),
  completeOnboarding: () => set({ isOnboardingComplete: true }),
  resetOnboarding: () => set({
    militaryBranch: '',
    firstMeetDate: null,
    enlistmentDate: null,
    dischargeDate: null,
    isOnboardingComplete: false
  })
})); 