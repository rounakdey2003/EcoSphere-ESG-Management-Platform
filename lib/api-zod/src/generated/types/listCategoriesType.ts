
export type ListCategoriesType = typeof ListCategoriesType[keyof typeof ListCategoriesType];


export const ListCategoriesType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;
