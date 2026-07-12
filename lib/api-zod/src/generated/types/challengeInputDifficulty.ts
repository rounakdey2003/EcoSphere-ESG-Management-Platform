
export type ChallengeInputDifficulty = typeof ChallengeInputDifficulty[keyof typeof ChallengeInputDifficulty];


export const ChallengeInputDifficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;
