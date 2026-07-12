import type { EmployeeInputGender } from './employeeInputGender';
import type { EmployeeInputStatus } from './employeeInputStatus';

export interface EmployeeInput {
  name: string;
  email: string;
  role?: string;
  departmentId: number;
  gender?: EmployeeInputGender;
  joinedAt?: Date;
  status?: EmployeeInputStatus;
}
