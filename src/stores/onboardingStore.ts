import { create } from "zustand";
import { onboardingQueries } from "@/entities/onboarding/service";
import axios from "axios";

interface OnboardingAlarmState {
  nickname: string;
  birthday: string;
  isAgeVisible: boolean;
  isGenderVisible: boolean;
  isAlarmEnabled: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setNickname: (nickname: string) => void;
  setBirthday: (birthday: string) => void;
  setAgeVisible: (isVisible: boolean) => void;
  setGenderVisible: (isVisible: boolean) => void;
  setAlarmEnabled: (isEnabled: boolean) => void;
  submitOnboarding: (isNotification: boolean) => Promise<any>;
  resetOnboarding: () => void;
}

export const useOnboardingAlarmStore = create<OnboardingAlarmState>(set => ({
  nickname: "",
  birthday: "",
  isAgeVisible: false,
  isGenderVisible: false,
  isAlarmEnabled: false,
  isLoading: false,
  error: null,

  setNickname: nickname => set({ nickname }),
  setBirthday: birthday => set({ birthday }),
  setAgeVisible: isVisible => set({ isAgeVisible: isVisible }),
  setGenderVisible: isVisible => set({ isGenderVisible: isVisible }),
  setAlarmEnabled: isEnabled => set({ isAlarmEnabled: isEnabled }),
  
  submitOnboarding: async (isNotification: boolean) => {
    set({ isLoading: true, error: null });
    try {
      const state = useOnboardingAlarmStore.getState();
      
      if (!state.nickname || !state.birthday || !state.isAgeVisible || !state.isGenderVisible) {
        throw new Error("입력되지 않은 정보가 있어요");
      }

      const response = await onboardingQueries.postOnboarding({
        nickname: state.nickname,
        birthDate: state.birthday,
        fcmToken: "string", // TODO: 실제 FCM 토큰 구현 필요
        isNotification
      });

      set({ 
        isAlarmEnabled: isNotification,
        isLoading: false 
      });

      return response;
    } catch (error) {
      console.error("온보딩 API 호출 실패:", error);
      if (axios.isAxiosError(error)) {
        const redirectUri = encodeURIComponent(`${window.location.origin}/onboarding/alarm`);
        window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
      }
      set({ 
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        isLoading: false 
      });
      throw error;
    }
  },

  resetOnboarding: () =>
    set({
      nickname: "",
      birthday: "",
      isAgeVisible: false,
      isGenderVisible: false,
      isAlarmEnabled: false,
      isLoading: false,
      error: null
    }),
}));
