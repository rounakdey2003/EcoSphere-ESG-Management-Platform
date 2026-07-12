
export type CategoryInputStatus = typeof CategoryInputStatus[keyof typeof CategoryInputStatus];


export const CategoryInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
