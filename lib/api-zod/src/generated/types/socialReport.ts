import type { ActivityByCategory } from './activityByCategory';
import type { GenderDist } from './genderDist';
import type { ReportPeriod } from './reportPeriod';
import type { TopParticipant } from './topParticipant';

export interface SocialReport {
  generatedAt?: Date;
  period?: ReportPeriod;
  totalParticipations?: number;
  approvalRate?: number;
  activitiesByCategory?: ActivityByCategory[];
  genderDistribution?: GenderDist[];
  topParticipants?: TopParticipant[];
}
