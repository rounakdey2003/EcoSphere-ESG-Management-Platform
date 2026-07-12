import type { BadgeInputUnlockType } from './badgeInputUnlockType';

export interface BadgeInput {
  name: string;
  description: string;
  unlockRule: string;
  unlockType: BadgeInputUnlockType;
  unlockValue: number;
  icon: string;
  isActive?: boolean;
}
