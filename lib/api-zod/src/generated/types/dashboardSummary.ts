import type { ActivityItem } from './activityItem';

export interface DashboardSummary {
  overallEsgScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalCarbonEmissions?: number;
  activeChallenges?: number;
  totalEmployees?: number;
  activeParticipations?: number;
  openComplianceIssues?: number;
  overdueComplianceIssues?: number;
  recentActivity?: ActivityItem[];
}
