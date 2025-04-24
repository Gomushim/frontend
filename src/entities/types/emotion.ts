import { ComponentType } from 'react';

export type EmotionType = 'angry' | 'worry' | 'common' | 'happy' | 'miss' | 'sad' | 'tired';

export type EmotionStatus = 'default' | 'focus' | 'inactive';

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
import angryDefault from '@/assets/images/character/default_angry.svg?react';
import angryFocus from '@/assets/images/character/focus_angry.svg?react';
import angryInactive from '@/assets/images/character/inactive_angry.svg?react';
import worryDefault from '@/assets/images/character/default_worry.svg?react';
import worryFocus from '@/assets/images/character/focus_worry.svg?react';
import worryInactive from '@/assets/images/character/inactive_worry.svg?react';
import happyDefault from '@/assets/images/character/default_happy.svg?react';
import happyFocus from '@/assets/images/character/focus_happy.svg?react';
import happyInactive from '@/assets/images/character/inactive_happy.svg?react';
import missDefault from '@/assets/images/character/default_miss.svg?react';
import missFocus from '@/assets/images/character/focus_miss.svg?react';
import missInactive from '@/assets/images/character/inactive_miss.svg?react';
import commonDefault from '@/assets/images/character/default_common.svg?react';
import commonFocus from '@/assets/images/character/focus_common.svg?react';
import commonInactive from '@/assets/images/character/inactive_common.svg?react';
import sadDefault from '@/assets/images/character/default_sad.svg?react';
import sadFocus from '@/assets/images/character/focus_sad.svg?react';
import sadInactive from '@/assets/images/character/inactive_sad.svg?react';
import tiredDefault from '@/assets/images/character/default_tired.svg?react';
import tiredFocus from '@/assets/images/character/focus_tired.svg?react';
import tiredInactive from '@/assets/images/character/inactive_tired.svg?react';

export const EMOTION_IMAGES: EmotionImageType = {
  angry: {
    default: angryDefault,
    focus: angryFocus,
    inactive: angryInactive,
  },
  worry: {
    default: worryDefault,
    focus: worryFocus,
    inactive: worryInactive,
  },
  happy: {
    default: happyDefault,
    focus: happyFocus,
    inactive: happyInactive,
  },
  miss: {
    default: missDefault,
    focus: missFocus,
    inactive: missInactive,
  },
  common: {
    default: commonDefault,
    focus: commonFocus,
    inactive: commonInactive,
  },
  sad: {
    default: sadDefault,
    focus: sadFocus,
    inactive: sadInactive,
  },
  tired: {
    default: tiredDefault,
    focus: tiredFocus,
    inactive: tiredInactive,
  },
}; 