import type { AuditStatus } from './auditStatus';

export interface Audit {
  id: number;
  title: string;
    description?: string | null;
  auditor: string;
    departmentId?: number | null;
    departmentName?: string | null;
  auditDate: Date;
  status: AuditStatus;
  issueCount?: number;
}
