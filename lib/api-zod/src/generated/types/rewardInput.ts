import type { RewardInputStatus } from './rewardInputStatus';

export interface RewardInput {
  name: string;
  description: string;
  pointsRequired: number;
  stock: number;
  status?: RewardInputStatus;
}
