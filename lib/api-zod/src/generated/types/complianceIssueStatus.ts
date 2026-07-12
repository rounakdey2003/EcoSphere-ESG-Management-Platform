
export type ComplianceIssueStatus = typeof ComplianceIssueStatus[keyof typeof ComplianceIssueStatus];


export const ComplianceIssueStatus = {
  open: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  overdue: 'overdue',
} as const;
