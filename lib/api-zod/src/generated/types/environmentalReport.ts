import type { CarbonTransaction } from './carbonTransaction';
import type { EmissionByDept } from './emissionByDept';
import type { EmissionBySource } from './emissionBySource';
import type { EnvironmentalGoal } from './environmentalGoal';
import type { ReportPeriod } from './reportPeriod';

export interface EnvironmentalReport {
  generatedAt?: Date;
  period?: ReportPeriod;
  totalEmissions?: number;
  emissionsByDepartment?: EmissionByDept[];
  emissionsBySource?: EmissionBySource[];
  goalsStatus?: EnvironmentalGoal[];
  transactions?: CarbonTransaction[];
}
