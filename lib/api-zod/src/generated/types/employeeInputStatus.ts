
export type EmployeeInputStatus = typeof EmployeeInputStatus[keyof typeof EmployeeInputStatus];


export const EmployeeInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
