
export type CarbonTransactionInputSource = typeof CarbonTransactionInputSource[keyof typeof CarbonTransactionInputSource];


export const CarbonTransactionInputSource = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  manual: 'manual',
} as const;
