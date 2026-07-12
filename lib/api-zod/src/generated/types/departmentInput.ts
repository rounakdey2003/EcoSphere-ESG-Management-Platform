import type { DepartmentInputStatus } from './departmentInputStatus';

export interface DepartmentInput {
  name: string;
  code: string;
  head?: string;
  parentDepartmentId?: number;
  employeeCount?: number;
  status?: DepartmentInputStatus;
}
