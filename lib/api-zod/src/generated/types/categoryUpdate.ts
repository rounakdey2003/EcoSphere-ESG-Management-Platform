import type { CategoryUpdateStatus } from './categoryUpdateStatus';
import type { CategoryUpdateType } from './categoryUpdateType';

export interface CategoryUpdate {
  name?: string;
  type?: CategoryUpdateType;
  status?: CategoryUpdateStatus;
}
