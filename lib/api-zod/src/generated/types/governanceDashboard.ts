import type { Audit } from './audit';
import type { IssuesBySeverity } from './issuesBySeverity';

export interface GovernanceDashboard {
  activePolicies?: number;
  totalAcknowledgements?: number;
  acknowledgementRate?: number;
  totalAudits?: number;
  completedAudits?: number;
  openComplianceIssues?: number;
  overdueComplianceIssues?: number;
  issuesBySeverity?: IssuesBySeverity[];
  recentAudits?: Audit[];
}
