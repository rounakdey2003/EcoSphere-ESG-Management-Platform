
export type ComplianceIssueInputStatus = typeof ComplianceIssueInputStatus[keyof typeof ComplianceIssueInputStatus];


export const ComplianceIssueInputStatus = {
  open: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  overdue: 'overdue',
} as const;
