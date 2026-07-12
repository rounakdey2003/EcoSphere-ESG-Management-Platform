
export type ComplianceIssueSeverity = typeof ComplianceIssueSeverity[keyof typeof ComplianceIssueSeverity];


export const ComplianceIssueSeverity = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
} as const;
