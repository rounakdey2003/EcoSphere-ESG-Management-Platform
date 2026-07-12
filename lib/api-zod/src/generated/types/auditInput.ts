import type { AuditInputStatus } from './auditInputStatus';

export interface AuditInput {
  title: string;
  description?: string;
  auditor: string;
  departmentId?: number;
  auditDate: Date;
  status?: AuditInputStatus;
}
