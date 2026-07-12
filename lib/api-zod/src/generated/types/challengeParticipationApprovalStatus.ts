
export type ChallengeParticipationApprovalStatus = typeof ChallengeParticipationApprovalStatus[keyof typeof ChallengeParticipationApprovalStatus];


export const ChallengeParticipationApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;
