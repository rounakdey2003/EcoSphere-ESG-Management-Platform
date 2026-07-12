import type { ComplianceIssueSeverity } from './complianceIssueSeverity';
import type { ComplianceIssueStatus } from './complianceIssueStatus';

export interface ComplianceIssue {
  id: number;
  auditId: number;
    auditTitle?: string | null;
  severity: ComplianceIssueSeverity;
  description: string;
  ownerId: number;
    ownerName?: string | null;
  dueDate: Date;
  status: ComplianceIssueStatus;
  isOverdue?: boolean;
  createdAt?: Date;
}
