import type { ChallengeParticipationUpdateApprovalStatus } from './challengeParticipationUpdateApprovalStatus';

export interface ChallengeParticipationUpdate {
  progress?: number;
  proof?: string;
  approvalStatus?: ChallengeParticipationUpdateApprovalStatus;
  xpAwarded?: number;
}
