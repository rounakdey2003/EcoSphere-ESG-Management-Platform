
export interface LeaderboardEntry {
  rank: number;
  employeeId: number;
  employeeName: string;
    departmentName?: string | null;
  xp: number;
  totalPoints?: number;
  badgeCount: number;
  challengeCount: number;
}
