
export interface RewardRedemption {
  id: number;
  employeeId: number;
    employeeName?: string | null;
  rewardId: number;
    rewardName?: string | null;
  pointsSpent: number;
  redeemedAt: Date;
}
