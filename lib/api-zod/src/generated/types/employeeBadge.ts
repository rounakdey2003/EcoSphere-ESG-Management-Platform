
export interface EmployeeBadge {
  id: number;
  employeeId: number;
    employeeName?: string | null;
  badgeId: number;
    badgeName?: string | null;
    badgeIcon?: string | null;
  awardedAt: Date;
}
