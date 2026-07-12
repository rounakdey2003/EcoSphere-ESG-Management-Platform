import type { ChallengeParticipationApprovalStatus } from './challengeParticipationApprovalStatus';

export interface ChallengeParticipation {
  id: number;
  challengeId: number;
    challengeTitle?: string | null;
  employeeId: number;
    employeeName?: string | null;
  progress?: number;
    proof?: string | null;
  approvalStatus: ChallengeParticipationApprovalStatus;
  xpAwarded?: number;
  submittedAt?: Date;
}
