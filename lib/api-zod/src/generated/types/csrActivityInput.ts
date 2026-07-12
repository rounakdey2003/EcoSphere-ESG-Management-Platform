import type { CsrActivityInputStatus } from './csrActivityInputStatus';

export interface CsrActivityInput {
  title: string;
  description?: string;
  categoryId: number;
  departmentId?: number;
  points?: number;
  startDate: Date;
  endDate?: Date;
  status?: CsrActivityInputStatus;
}
