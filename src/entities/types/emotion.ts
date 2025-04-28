import { ComponentType } from "react";

export type EmotionType = "angry" | "worry" | "common" | "happy" | "miss" | "sad" | "tired";

export type EmotionStatus = "default" | "focus" | "inactive" | "base";

export interface EmotionItem {
  type: EmotionType;
  label: string;
}

export type EmotionImageType = {
  [key in EmotionType]: {
    [status in EmotionStatus]: ComponentType<React.SVGProps<SVGSVGElement>>;
  };
};

// 이미지 import
import angryDefault from "@/assets/images/character/default_angry.svg?react";
import angryFocus from "@/assets/images/character/focus_angry.svg?react";
import angryInactive from "@/assets/images/character/inactive_angry.svg?react";
import worryDefault from "@/assets/images/character/default_worry.svg?react";
import worryFocus from "@/assets/images/character/focus_worry.svg?react";
import worryInactive from "@/assets/images/character/inactive_worry.svg?react";
import happyDefault from "@/assets/images/character/default_happy.svg?react";
import happyFocus from "@/assets/images/character/focus_happy.svg?react";
import happyInactive from "@/assets/images/character/inactive_happy.svg?react";
import missDefault from "@/assets/images/character/default_miss.svg?react";
import missFocus from "@/assets/images/character/focus_miss.svg?react";
import missInactive from "@/assets/images/character/inactive_miss.svg?react";
import commonDefault from "@/assets/images/character/default_common.svg?react";
import commonFocus from "@/assets/images/character/focus_common.svg?react";
import commonInactive from "@/assets/images/character/inactive_common.svg?react";
import sadDefault from "@/assets/images/character/default_sad.svg?react";
import sadFocus from "@/assets/images/character/focus_sad.svg?react";
import sadInactive from "@/assets/images/character/inactive_sad.svg?react";
import tiredDefault from "@/assets/images/character/default_tired.svg?react";
import tiredFocus from "@/assets/images/character/focus_tired.svg?react";
import tiredInactive from "@/assets/images/character/inactive_tired.svg?react";

// 기본 이미지 import
import angry from "@/assets/images/character/angry.svg?react";
import worry from "@/assets/images/character/worry.svg?react";
import happy from "@/assets/images/character/happy.svg?react";
import miss from "@/assets/images/character/miss.svg?react";
import common from "@/assets/images/character/common.svg?react";
import sad from "@/assets/images/character/sad.svg?react";
import tired from "@/assets/images/character/tired.svg?react";

export const EMOTION_IMAGES: EmotionImageType = {
  angry: {
    default: angryDefault,
    focus: angryFocus,
    inactive: angryInactive,
    base: angry,
  },
  worry: {
    default: worryDefault,
    focus: worryFocus,
    inactive: worryInactive,
    base: worry,
  },
  happy: {
    default: happyDefault,
    focus: happyFocus,
    inactive: happyInactive,
    base: happy,
  },
  miss: {
    default: missDefault,
    focus: missFocus,
    inactive: missInactive,
    base: miss,
  },
  common: {
    default: commonDefault,
    focus: commonFocus,
    inactive: commonInactive,
    base: common,
  },
  sad: {
    default: sadDefault,
    focus: sadFocus,
    inactive: sadInactive,
    base: sad,
  },
  tired: {
    default: tiredDefault,
    focus: tiredFocus,
    inactive: tiredInactive,
    base: tired,
  },
};
