
export type ChallengeStatus = typeof ChallengeStatus[keyof typeof ChallengeStatus];


export const ChallengeStatus = {
  draft: 'draft',
  active: 'active',
  under_review: 'under_review',
  completed: 'completed',
  archived: 'archived',
} as const;
