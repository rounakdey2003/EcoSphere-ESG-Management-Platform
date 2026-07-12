
export type EmployeeParticipationUpdateApprovalStatus = typeof EmployeeParticipationUpdateApprovalStatus[keyof typeof EmployeeParticipationUpdateApprovalStatus];


export const EmployeeParticipationUpdateApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;
