import type { EnvironmentalGoalStatus } from './environmentalGoalStatus';

export interface EnvironmentalGoal {
  id: number;
  title: string;
    description?: string | null;
    departmentId?: number | null;
    departmentName?: string | null;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  status: EnvironmentalGoalStatus;
  progressPercent?: number;
}
