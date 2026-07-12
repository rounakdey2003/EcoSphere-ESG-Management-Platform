
export type EmployeeParticipationApprovalStatus = typeof EmployeeParticipationApprovalStatus[keyof typeof EmployeeParticipationApprovalStatus];


export const EmployeeParticipationApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;
