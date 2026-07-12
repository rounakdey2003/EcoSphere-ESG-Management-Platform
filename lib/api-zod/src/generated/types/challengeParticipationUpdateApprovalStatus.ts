
export type ChallengeParticipationUpdateApprovalStatus = typeof ChallengeParticipationUpdateApprovalStatus[keyof typeof ChallengeParticipationUpdateApprovalStatus];


export const ChallengeParticipationUpdateApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;
