
export type DepartmentUpdateStatus = typeof DepartmentUpdateStatus[keyof typeof DepartmentUpdateStatus];


export const DepartmentUpdateStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
