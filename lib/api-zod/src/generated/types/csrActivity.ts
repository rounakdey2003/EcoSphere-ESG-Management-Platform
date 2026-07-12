import type { CsrActivityStatus } from './csrActivityStatus';

export interface CsrActivity {
  id: number;
  title: string;
    description?: string | null;
  categoryId: number;
    categoryName?: string | null;
    departmentId?: number | null;
    departmentName?: string | null;
  points?: number;
  startDate: Date;
    endDate?: string | null;
  status: CsrActivityStatus;
  participantCount?: number;
}
