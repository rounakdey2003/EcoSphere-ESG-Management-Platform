import type { CategoryStatus } from './categoryStatus';
import type { CategoryType } from './categoryType';

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  status: CategoryStatus;
}
