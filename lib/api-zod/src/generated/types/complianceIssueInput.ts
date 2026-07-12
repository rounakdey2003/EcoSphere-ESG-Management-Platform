import type { ComplianceIssueInputSeverity } from './complianceIssueInputSeverity';
import type { ComplianceIssueInputStatus } from './complianceIssueInputStatus';

export interface ComplianceIssueInput {
  auditId: number;
  severity: ComplianceIssueInputSeverity;
  description: string;
  ownerId: number;
  dueDate: Date;
  status?: ComplianceIssueInputStatus;
}
