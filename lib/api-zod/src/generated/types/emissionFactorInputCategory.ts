
export type EmissionFactorInputCategory = typeof EmissionFactorInputCategory[keyof typeof EmissionFactorInputCategory];


export const EmissionFactorInputCategory = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  other: 'other',
} as const;
