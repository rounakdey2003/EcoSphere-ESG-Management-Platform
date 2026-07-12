
export type RewardInputStatus = typeof RewardInputStatus[keyof typeof RewardInputStatus];


export const RewardInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
