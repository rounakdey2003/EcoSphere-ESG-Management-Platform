
export type CategoryStatus = typeof CategoryStatus[keyof typeof CategoryStatus];


export const CategoryStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
