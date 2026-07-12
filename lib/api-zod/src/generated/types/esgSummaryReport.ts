import type { DepartmentRanking } from './departmentRanking';
import type { ReportPeriod } from './reportPeriod';

export interface EsgSummaryReport {
  generatedAt?: Date;
  period?: ReportPeriod;
  overallScore?: number;
  environmentalScore?: number;
  socialScore?: number;
  governanceScore?: number;
  departmentRankings?: DepartmentRanking[];
  highlights?: string[];
}
