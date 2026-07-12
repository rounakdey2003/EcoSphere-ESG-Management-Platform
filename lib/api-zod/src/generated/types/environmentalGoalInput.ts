import type { EnvironmentalGoalInputStatus } from './environmentalGoalInputStatus';

export interface EnvironmentalGoalInput {
  title: string;
  description?: string;
  departmentId?: number;
  targetValue: number;
  currentValue?: number;
  unit: string;
  deadline: Date;
  status?: EnvironmentalGoalInputStatus;
}
