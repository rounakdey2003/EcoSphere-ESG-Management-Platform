
export type ChallengeInputStatus = typeof ChallengeInputStatus[keyof typeof ChallengeInputStatus];


export const ChallengeInputStatus = {
  draft: 'draft',
  active: 'active',
  under_review: 'under_review',
  completed: 'completed',
  archived: 'archived',
} as const;
