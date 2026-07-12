
export type EmployeeStatus = typeof EmployeeStatus[keyof typeof EmployeeStatus];


export const EmployeeStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
