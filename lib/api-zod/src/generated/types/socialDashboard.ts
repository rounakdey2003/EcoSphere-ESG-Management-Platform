import type { GenderDist } from './genderDist';
import type { ParticipationByDept } from './participationByDept';
import type { TopParticipant } from './topParticipant';

export interface SocialDashboard {
  totalParticipations?: number;
  approvedParticipations?: number;
  pendingParticipations?: number;
  activeCsrActivities?: number;
  participationsByDepartment?: ParticipationByDept[];
  genderDistribution?: GenderDist[];
  topParticipants?: TopParticipant[];
}
