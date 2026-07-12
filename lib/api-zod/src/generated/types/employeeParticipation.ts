import type { EmployeeParticipationApprovalStatus } from './employeeParticipationApprovalStatus';

export interface EmployeeParticipation {
  id: number;
  employeeId: number;
    employeeName?: string | null;
  activityId: number;
    activityTitle?: string | null;
    proof?: string | null;
  approvalStatus: EmployeeParticipationApprovalStatus;
  pointsEarned?: number;
    completionDate?: string | null;
  submittedAt?: Date;
}
