
export type CategoryType = typeof CategoryType[keyof typeof CategoryType];


export const CategoryType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;
