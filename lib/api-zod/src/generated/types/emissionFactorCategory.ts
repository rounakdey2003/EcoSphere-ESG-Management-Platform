
export type EmissionFactorCategory = typeof EmissionFactorCategory[keyof typeof EmissionFactorCategory];


export const EmissionFactorCategory = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  other: 'other',
} as const;
