import type { EsgPolicyCategory } from './esgPolicyCategory';
import type { EsgPolicyStatus } from './esgPolicyStatus';

export interface EsgPolicy {
  id: number;
  title: string;
    description?: string | null;
  category: EsgPolicyCategory;
  effectiveDate: Date;
    expiryDate?: string | null;
  status: EsgPolicyStatus;
  acknowledgementCount?: number;
  totalEmployees?: number;
}
