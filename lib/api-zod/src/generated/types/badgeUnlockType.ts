
export type BadgeUnlockType = typeof BadgeUnlockType[keyof typeof BadgeUnlockType];


export const BadgeUnlockType = {
  xp_threshold: 'xp_threshold',
  challenge_count: 'challenge_count',
  participation_count: 'participation_count',
} as const;
