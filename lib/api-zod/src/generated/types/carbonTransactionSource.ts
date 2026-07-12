
export type CarbonTransactionSource = typeof CarbonTransactionSource[keyof typeof CarbonTransactionSource];


export const CarbonTransactionSource = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  manual: 'manual',
} as const;
