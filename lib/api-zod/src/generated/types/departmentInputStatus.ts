
export type DepartmentInputStatus = typeof DepartmentInputStatus[keyof typeof DepartmentInputStatus];


export const DepartmentInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
