import type { RewardStatus } from './rewardStatus';

export interface Reward {
  id: number;
  name: string;
  description: string;
  pointsRequired: number;
  stock: number;
  status: RewardStatus;
  redemptionCount?: number;
}
