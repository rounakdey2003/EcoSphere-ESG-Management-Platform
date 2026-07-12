import type { BadgeUnlockType } from './badgeUnlockType';

export interface Badge {
  id: number;
  name: string;
  description: string;
  unlockRule: string;
  unlockType?: BadgeUnlockType;
  unlockValue?: number;
  icon: string;
  isActive?: boolean;
}
