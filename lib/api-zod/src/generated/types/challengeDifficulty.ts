
export type ChallengeDifficulty = typeof ChallengeDifficulty[keyof typeof ChallengeDifficulty];


export const ChallengeDifficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;
