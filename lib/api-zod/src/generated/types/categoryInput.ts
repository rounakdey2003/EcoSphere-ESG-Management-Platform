import type { CategoryInputStatus } from './categoryInputStatus';
import type { CategoryInputType } from './categoryInputType';

export interface CategoryInput {
  name: string;
  type: CategoryInputType;
  status?: CategoryInputStatus;
}
