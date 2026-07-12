
export type RewardStatus = typeof RewardStatus[keyof typeof RewardStatus];


export const RewardStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
