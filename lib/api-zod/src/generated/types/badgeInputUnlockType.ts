
export type BadgeInputUnlockType = typeof BadgeInputUnlockType[keyof typeof BadgeInputUnlockType];


export const BadgeInputUnlockType = {
  xp_threshold: 'xp_threshold',
  challenge_count: 'challenge_count',
  participation_count: 'participation_count',
} as const;
