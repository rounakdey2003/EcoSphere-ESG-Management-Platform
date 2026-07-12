
export type CategoryInputType = typeof CategoryInputType[keyof typeof CategoryInputType];


export const CategoryInputType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;
