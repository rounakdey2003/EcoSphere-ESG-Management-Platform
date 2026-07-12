
export type CategoryUpdateType = typeof CategoryUpdateType[keyof typeof CategoryUpdateType];


export const CategoryUpdateType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;
