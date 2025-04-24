import { create } from 'zustand';

interface OnboardingAlarmState {
  nickname: string;
  birthday: string;
  isAgeVisible: boolean;
  isGenderVisible: boolean;
  isAlarmEnabled: boolean;
  
  // Actions
  setNickname: (nickname: string) => void;
  setBirthday: (birthday: string) => void;
  setAgeVisible: (isVisible: boolean) => void;
  setGenderVisible: (isVisible: boolean) => void;
  setAlarmEnabled: (isEnabled: boolean) => void;
  resetOnboarding: () => void;
}

export const useOnboardingAlarmStore = create<OnboardingAlarmState>((set) => ({
  nickname: '',
  birthday: '',
  isAgeVisible: false,
  isGenderVisible: false,
  isAlarmEnabled: false,

  setNickname: (nickname) => set({ nickname }),
  setBirthday: (birthday) => set({ birthday }),
  setAgeVisible: (isVisible) => set({ isAgeVisible: isVisible }),
  setGenderVisible: (isVisible) => set({ isGenderVisible: isVisible }),
  setAlarmEnabled: (isEnabled) => set({ isAlarmEnabled: isEnabled }),
  resetOnboarding: () => set({
    nickname: '',
    birthday: '',
    isAgeVisible: false,
    isGenderVisible: false,
    isAlarmEnabled: false,
  }),
})); 