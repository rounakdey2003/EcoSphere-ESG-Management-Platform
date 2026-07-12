
export type CategoryUpdateStatus = typeof CategoryUpdateStatus[keyof typeof CategoryUpdateStatus];


export const CategoryUpdateStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
