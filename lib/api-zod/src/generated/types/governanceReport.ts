import type { IssuesBySeverity } from './issuesBySeverity';
import type { ReportPeriod } from './reportPeriod';

export interface GovernanceReport {
  generatedAt?: Date;
  period?: ReportPeriod;
  activePolicies?: number;
  acknowledgementRate?: number;
  auditsCompleted?: number;
  complianceIssuesRaised?: number;
  complianceIssuesResolved?: number;
  issuesBySeverity?: IssuesBySeverity[];
}
