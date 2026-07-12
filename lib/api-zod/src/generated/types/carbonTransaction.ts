import type { CarbonTransactionSource } from './carbonTransactionSource';

export interface CarbonTransaction {
  id: number;
  departmentId: number;
    departmentName?: string | null;
  emissionFactorId: number;
    emissionFactorName?: string | null;
  quantity: number;
  totalEmission: number;
  source: CarbonTransactionSource;
    description?: string | null;
  transactionDate: Date;
  createdAt?: Date;
}
