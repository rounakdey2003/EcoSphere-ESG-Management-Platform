import type { EmployeeStatus } from './employeeStatus';

export interface Employee {
  id: number;
  name: string;
  email: string;
  role?: string;
  departmentId: number;
    departmentName?: string | null;
    gender?: string | null;
  xp?: number;
  totalPoints?: number;
  joinedAt?: Date;
  status?: EmployeeStatus;
}
