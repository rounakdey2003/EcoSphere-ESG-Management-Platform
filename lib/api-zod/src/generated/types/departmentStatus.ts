
export type DepartmentStatus = typeof DepartmentStatus[keyof typeof DepartmentStatus];


export const DepartmentStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
