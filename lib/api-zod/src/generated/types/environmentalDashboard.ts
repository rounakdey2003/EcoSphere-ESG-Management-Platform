import type { EmissionByDept } from './emissionByDept';
import type { EmissionBySource } from './emissionBySource';
import type { EnvironmentalGoal } from './environmentalGoal';
import type { TrendPoint } from './trendPoint';

export interface EnvironmentalDashboard {
  totalEmissions?: number;
  emissionsByDepartment?: EmissionByDept[];
  emissionsBySource?: EmissionBySource[];
  emissionsTrend?: TrendPoint[];
  goalsProgress?: EnvironmentalGoal[];
  goalsAchieved?: number;
  goalsTotal?: number;
}
