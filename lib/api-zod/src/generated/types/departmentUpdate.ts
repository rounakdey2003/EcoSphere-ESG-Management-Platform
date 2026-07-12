import type { DepartmentUpdateStatus } from './departmentUpdateStatus';

export interface DepartmentUpdate {
  name?: string;
  code?: string;
  head?: string;
  parentDepartmentId?: number;
  employeeCount?: number;
  status?: DepartmentUpdateStatus;
}
