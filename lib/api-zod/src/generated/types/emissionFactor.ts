import type { EmissionFactorCategory } from './emissionFactorCategory';

export interface EmissionFactor {
  id: number;
  name: string;
  category: EmissionFactorCategory;
  factor: number;
  unit: string;
    description?: string | null;
  isActive?: boolean;
}
