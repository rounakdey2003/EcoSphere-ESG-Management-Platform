import type { EmissionFactorInputCategory } from './emissionFactorInputCategory';

export interface EmissionFactorInput {
  name: string;
  category: EmissionFactorInputCategory;
  factor: number;
  unit: string;
  description?: string;
  isActive?: boolean;
}
