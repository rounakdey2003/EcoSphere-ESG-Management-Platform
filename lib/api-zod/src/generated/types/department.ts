import type { DepartmentStatus } from './departmentStatus';

export interface Department {
  id: number;
  name: string;
  code: string;
    head?: string | null;
    parentDepartmentId?: number | null;
  employeeCount?: number;
  status: DepartmentStatus;
  createdAt?: Date;
}
