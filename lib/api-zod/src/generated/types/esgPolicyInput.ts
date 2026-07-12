import type { EsgPolicyInputCategory } from './esgPolicyInputCategory';
import type { EsgPolicyInputStatus } from './esgPolicyInputStatus';

export interface EsgPolicyInput {
  title: string;
  description?: string;
  category: EsgPolicyInputCategory;
  effectiveDate: Date;
  expiryDate?: Date;
  status?: EsgPolicyInputStatus;
}
