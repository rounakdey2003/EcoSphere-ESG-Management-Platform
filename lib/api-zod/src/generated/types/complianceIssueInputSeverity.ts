
export type ComplianceIssueInputSeverity = typeof ComplianceIssueInputSeverity[keyof typeof ComplianceIssueInputSeverity];


export const ComplianceIssueInputSeverity = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
} as const;
