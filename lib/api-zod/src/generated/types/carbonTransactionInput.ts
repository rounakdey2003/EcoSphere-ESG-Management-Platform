import type { CarbonTransactionInputSource } from './carbonTransactionInputSource';

export interface CarbonTransactionInput {
  departmentId: number;
  emissionFactorId: number;
  quantity: number;
  source: CarbonTransactionInputSource;
  description?: string;
  transactionDate: Date;
}
