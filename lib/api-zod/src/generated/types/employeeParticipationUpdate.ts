import type { EmployeeParticipationUpdateApprovalStatus } from './employeeParticipationUpdateApprovalStatus';

export interface EmployeeParticipationUpdate {
  proof?: string;
  approvalStatus?: EmployeeParticipationUpdateApprovalStatus;
  pointsEarned?: number;
  completionDate?: Date;
}
