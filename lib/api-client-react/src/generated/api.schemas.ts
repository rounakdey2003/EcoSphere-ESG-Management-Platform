export interface HealthStatus {
  status: string;
}

export type DepartmentStatus = typeof DepartmentStatus[keyof typeof DepartmentStatus];


export const DepartmentStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface Department {
  id: number;
  name: string;
  code: string;
    head?: string | null;
    parentDepartmentId?: number | null;
  employeeCount?: number;
  status: DepartmentStatus;
  createdAt?: string;
}

export type DepartmentInputStatus = typeof DepartmentInputStatus[keyof typeof DepartmentInputStatus];


export const DepartmentInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface DepartmentInput {
  name: string;
  code: string;
  head?: string;
  parentDepartmentId?: number;
  employeeCount?: number;
  status?: DepartmentInputStatus;
}

export type DepartmentUpdateStatus = typeof DepartmentUpdateStatus[keyof typeof DepartmentUpdateStatus];


export const DepartmentUpdateStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface DepartmentUpdate {
  name?: string;
  code?: string;
  head?: string;
  parentDepartmentId?: number;
  employeeCount?: number;
  status?: DepartmentUpdateStatus;
}

export interface DepartmentScore {
  departmentId: number;
  departmentName?: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
  updatedAt?: string;
}

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];


export const CategoryType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;

export type CategoryStatus = typeof CategoryStatus[keyof typeof CategoryStatus];


export const CategoryStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  status: CategoryStatus;
}

export type CategoryInputType = typeof CategoryInputType[keyof typeof CategoryInputType];


export const CategoryInputType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;

export type CategoryInputStatus = typeof CategoryInputStatus[keyof typeof CategoryInputStatus];


export const CategoryInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface CategoryInput {
  name: string;
  type: CategoryInputType;
  status?: CategoryInputStatus;
}

export type CategoryUpdateType = typeof CategoryUpdateType[keyof typeof CategoryUpdateType];


export const CategoryUpdateType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;

export type CategoryUpdateStatus = typeof CategoryUpdateStatus[keyof typeof CategoryUpdateStatus];


export const CategoryUpdateStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface CategoryUpdate {
  name?: string;
  type?: CategoryUpdateType;
  status?: CategoryUpdateStatus;
}

export type EmployeeStatus = typeof EmployeeStatus[keyof typeof EmployeeStatus];


export const EmployeeStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface Employee {
  id: number;
  name: string;
  email: string;
  role?: string;
  departmentId: number;
    departmentName?: string | null;
    gender?: string | null;
  xp?: number;
  totalPoints?: number;
  joinedAt?: string;
  status?: EmployeeStatus;
}

export type EmployeeInputGender = typeof EmployeeInputGender[keyof typeof EmployeeInputGender];


export const EmployeeInputGender = {
  male: 'male',
  female: 'female',
  other: 'other',
  prefer_not_to_say: 'prefer_not_to_say',
} as const;

export type EmployeeInputStatus = typeof EmployeeInputStatus[keyof typeof EmployeeInputStatus];


export const EmployeeInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface EmployeeInput {
  name: string;
  email: string;
  role?: string;
  departmentId: number;
  gender?: EmployeeInputGender;
  joinedAt?: string;
  status?: EmployeeInputStatus;
}

export interface EmployeeUpdate {
  name?: string;
  email?: string;
  role?: string;
  departmentId?: number;
  gender?: string;
  status?: string;
}

export type EmissionFactorCategory = typeof EmissionFactorCategory[keyof typeof EmissionFactorCategory];


export const EmissionFactorCategory = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  other: 'other',
} as const;

export interface EmissionFactor {
  id: number;
  name: string;
  category: EmissionFactorCategory;
  factor: number;
  unit: string;
    description?: string | null;
  isActive?: boolean;
}

export type EmissionFactorInputCategory = typeof EmissionFactorInputCategory[keyof typeof EmissionFactorInputCategory];


export const EmissionFactorInputCategory = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  other: 'other',
} as const;

export interface EmissionFactorInput {
  name: string;
  category: EmissionFactorInputCategory;
  factor: number;
  unit: string;
  description?: string;
  isActive?: boolean;
}

export interface EmissionFactorUpdate {
  name?: string;
  category?: string;
  factor?: number;
  unit?: string;
  description?: string;
  isActive?: boolean;
}

export type CarbonTransactionSource = typeof CarbonTransactionSource[keyof typeof CarbonTransactionSource];


export const CarbonTransactionSource = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  manual: 'manual',
} as const;

export interface CarbonTransaction {
  id: number;
  departmentId: number;
    departmentName?: string | null;
  emissionFactorId: number;
    emissionFactorName?: string | null;
  quantity: number;
  totalEmission: number;
  source: CarbonTransactionSource;
    description?: string | null;
  transactionDate: string;
  createdAt?: string;
}

export type CarbonTransactionInputSource = typeof CarbonTransactionInputSource[keyof typeof CarbonTransactionInputSource];


export const CarbonTransactionInputSource = {
  purchase: 'purchase',
  manufacturing: 'manufacturing',
  expense: 'expense',
  fleet: 'fleet',
  manual: 'manual',
} as const;

export interface CarbonTransactionInput {
  departmentId: number;
  emissionFactorId: number;
  quantity: number;
  source: CarbonTransactionInputSource;
  description?: string;
  transactionDate: string;
}

export type EnvironmentalGoalStatus = typeof EnvironmentalGoalStatus[keyof typeof EnvironmentalGoalStatus];


export const EnvironmentalGoalStatus = {
  active: 'active',
  achieved: 'achieved',
  missed: 'missed',
  cancelled: 'cancelled',
} as const;

export interface EnvironmentalGoal {
  id: number;
  title: string;
    description?: string | null;
    departmentId?: number | null;
    departmentName?: string | null;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: EnvironmentalGoalStatus;
  progressPercent?: number;
}

export type EnvironmentalGoalInputStatus = typeof EnvironmentalGoalInputStatus[keyof typeof EnvironmentalGoalInputStatus];


export const EnvironmentalGoalInputStatus = {
  active: 'active',
  achieved: 'achieved',
  missed: 'missed',
  cancelled: 'cancelled',
} as const;

export interface EnvironmentalGoalInput {
  title: string;
  description?: string;
  departmentId?: number;
  targetValue: number;
  currentValue?: number;
  unit: string;
  deadline: string;
  status?: EnvironmentalGoalInputStatus;
}

export interface EnvironmentalGoalUpdate {
  title?: string;
  description?: string;
  targetValue?: number;
  currentValue?: number;
  deadline?: string;
  status?: string;
}

export type CsrActivityStatus = typeof CsrActivityStatus[keyof typeof CsrActivityStatus];


export const CsrActivityStatus = {
  planned: 'planned',
  active: 'active',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export interface CsrActivity {
  id: number;
  title: string;
    description?: string | null;
  categoryId: number;
    categoryName?: string | null;
    departmentId?: number | null;
    departmentName?: string | null;
  points?: number;
  startDate: string;
    endDate?: string | null;
  status: CsrActivityStatus;
  participantCount?: number;
}

export type CsrActivityInputStatus = typeof CsrActivityInputStatus[keyof typeof CsrActivityInputStatus];


export const CsrActivityInputStatus = {
  planned: 'planned',
  active: 'active',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export interface CsrActivityInput {
  title: string;
  description?: string;
  categoryId: number;
  departmentId?: number;
  points?: number;
  startDate: string;
  endDate?: string;
  status?: CsrActivityInputStatus;
}

export interface CsrActivityUpdate {
  title?: string;
  description?: string;
  categoryId?: number;
  departmentId?: number;
  points?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export type EmployeeParticipationApprovalStatus = typeof EmployeeParticipationApprovalStatus[keyof typeof EmployeeParticipationApprovalStatus];


export const EmployeeParticipationApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;

export interface EmployeeParticipation {
  id: number;
  employeeId: number;
    employeeName?: string | null;
  activityId: number;
    activityTitle?: string | null;
    proof?: string | null;
  approvalStatus: EmployeeParticipationApprovalStatus;
  pointsEarned?: number;
    completionDate?: string | null;
  submittedAt?: string;
}

export interface EmployeeParticipationInput {
  employeeId: number;
  activityId: number;
  proof?: string;
  completionDate?: string;
}

export type EmployeeParticipationUpdateApprovalStatus = typeof EmployeeParticipationUpdateApprovalStatus[keyof typeof EmployeeParticipationUpdateApprovalStatus];


export const EmployeeParticipationUpdateApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;

export interface EmployeeParticipationUpdate {
  proof?: string;
  approvalStatus?: EmployeeParticipationUpdateApprovalStatus;
  pointsEarned?: number;
  completionDate?: string;
}

export type EsgPolicyCategory = typeof EsgPolicyCategory[keyof typeof EsgPolicyCategory];


export const EsgPolicyCategory = {
  environmental: 'environmental',
  social: 'social',
  governance: 'governance',
} as const;

export type EsgPolicyStatus = typeof EsgPolicyStatus[keyof typeof EsgPolicyStatus];


export const EsgPolicyStatus = {
  draft: 'draft',
  active: 'active',
  archived: 'archived',
} as const;

export interface EsgPolicy {
  id: number;
  title: string;
    description?: string | null;
  category: EsgPolicyCategory;
  effectiveDate: string;
    expiryDate?: string | null;
  status: EsgPolicyStatus;
  acknowledgementCount?: number;
  totalEmployees?: number;
}

export type EsgPolicyInputCategory = typeof EsgPolicyInputCategory[keyof typeof EsgPolicyInputCategory];


export const EsgPolicyInputCategory = {
  environmental: 'environmental',
  social: 'social',
  governance: 'governance',
} as const;

export type EsgPolicyInputStatus = typeof EsgPolicyInputStatus[keyof typeof EsgPolicyInputStatus];


export const EsgPolicyInputStatus = {
  draft: 'draft',
  active: 'active',
  archived: 'archived',
} as const;

export interface EsgPolicyInput {
  title: string;
  description?: string;
  category: EsgPolicyInputCategory;
  effectiveDate: string;
  expiryDate?: string;
  status?: EsgPolicyInputStatus;
}

export interface EsgPolicyUpdate {
  title?: string;
  description?: string;
  category?: string;
  effectiveDate?: string;
  expiryDate?: string;
  status?: string;
}

export interface PolicyAcknowledgement {
  id: number;
  policyId: number;
    policyTitle?: string | null;
  employeeId: number;
    employeeName?: string | null;
  acknowledgedAt: string;
}

export interface PolicyAcknowledgementInput {
  policyId: number;
  employeeId: number;
}

export type AuditStatus = typeof AuditStatus[keyof typeof AuditStatus];


export const AuditStatus = {
  scheduled: 'scheduled',
  in_progress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export interface Audit {
  id: number;
  title: string;
    description?: string | null;
  auditor: string;
    departmentId?: number | null;
    departmentName?: string | null;
  auditDate: string;
  status: AuditStatus;
  issueCount?: number;
}

export type AuditInputStatus = typeof AuditInputStatus[keyof typeof AuditInputStatus];


export const AuditInputStatus = {
  scheduled: 'scheduled',
  in_progress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export interface AuditInput {
  title: string;
  description?: string;
  auditor: string;
  departmentId?: number;
  auditDate: string;
  status?: AuditInputStatus;
}

export interface AuditUpdate {
  title?: string;
  description?: string;
  auditor?: string;
  auditDate?: string;
  status?: string;
}

export type ComplianceIssueSeverity = typeof ComplianceIssueSeverity[keyof typeof ComplianceIssueSeverity];


export const ComplianceIssueSeverity = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
} as const;

export type ComplianceIssueStatus = typeof ComplianceIssueStatus[keyof typeof ComplianceIssueStatus];


export const ComplianceIssueStatus = {
  open: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  overdue: 'overdue',
} as const;

export interface ComplianceIssue {
  id: number;
  auditId: number;
    auditTitle?: string | null;
  severity: ComplianceIssueSeverity;
  description: string;
  ownerId: number;
    ownerName?: string | null;
  dueDate: string;
  status: ComplianceIssueStatus;
  isOverdue?: boolean;
  createdAt?: string;
}

export type ComplianceIssueInputSeverity = typeof ComplianceIssueInputSeverity[keyof typeof ComplianceIssueInputSeverity];


export const ComplianceIssueInputSeverity = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
} as const;

export type ComplianceIssueInputStatus = typeof ComplianceIssueInputStatus[keyof typeof ComplianceIssueInputStatus];


export const ComplianceIssueInputStatus = {
  open: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  overdue: 'overdue',
} as const;

export interface ComplianceIssueInput {
  auditId: number;
  severity: ComplianceIssueInputSeverity;
  description: string;
  ownerId: number;
  dueDate: string;
  status?: ComplianceIssueInputStatus;
}

export interface ComplianceIssueUpdate {
  severity?: string;
  description?: string;
  ownerId?: number;
  dueDate?: string;
  status?: string;
}

export type ChallengeDifficulty = typeof ChallengeDifficulty[keyof typeof ChallengeDifficulty];


export const ChallengeDifficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;

export type ChallengeStatus = typeof ChallengeStatus[keyof typeof ChallengeStatus];


export const ChallengeStatus = {
  draft: 'draft',
  active: 'active',
  under_review: 'under_review',
  completed: 'completed',
  archived: 'archived',
} as const;

export interface Challenge {
  id: number;
  title: string;
    description?: string | null;
  categoryId: number;
    categoryName?: string | null;
  xp: number;
  difficulty: ChallengeDifficulty;
  evidenceRequired?: boolean;
    deadline?: string | null;
  status: ChallengeStatus;
  participantCount?: number;
  createdAt?: string;
}

export type ChallengeInputDifficulty = typeof ChallengeInputDifficulty[keyof typeof ChallengeInputDifficulty];


export const ChallengeInputDifficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;

export type ChallengeInputStatus = typeof ChallengeInputStatus[keyof typeof ChallengeInputStatus];


export const ChallengeInputStatus = {
  draft: 'draft',
  active: 'active',
  under_review: 'under_review',
  completed: 'completed',
  archived: 'archived',
} as const;

export interface ChallengeInput {
  title: string;
  description?: string;
  categoryId: number;
  xp: number;
  difficulty: ChallengeInputDifficulty;
  evidenceRequired?: boolean;
  deadline?: string;
  status?: ChallengeInputStatus;
}

export interface ChallengeUpdate {
  title?: string;
  description?: string;
  categoryId?: number;
  xp?: number;
  difficulty?: string;
  evidenceRequired?: boolean;
  deadline?: string;
  status?: string;
}

export type ChallengeParticipationApprovalStatus = typeof ChallengeParticipationApprovalStatus[keyof typeof ChallengeParticipationApprovalStatus];


export const ChallengeParticipationApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;

export interface ChallengeParticipation {
  id: number;
  challengeId: number;
    challengeTitle?: string | null;
  employeeId: number;
    employeeName?: string | null;
  progress?: number;
    proof?: string | null;
  approvalStatus: ChallengeParticipationApprovalStatus;
  xpAwarded?: number;
  submittedAt?: string;
}

export interface ChallengeParticipationInput {
  challengeId: number;
  employeeId: number;
  progress?: number;
  proof?: string;
}

export type ChallengeParticipationUpdateApprovalStatus = typeof ChallengeParticipationUpdateApprovalStatus[keyof typeof ChallengeParticipationUpdateApprovalStatus];


export const ChallengeParticipationUpdateApprovalStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;

export interface ChallengeParticipationUpdate {
  progress?: number;
  proof?: string;
  approvalStatus?: ChallengeParticipationUpdateApprovalStatus;
  xpAwarded?: number;
}

export type BadgeUnlockType = typeof BadgeUnlockType[keyof typeof BadgeUnlockType];


export const BadgeUnlockType = {
  xp_threshold: 'xp_threshold',
  challenge_count: 'challenge_count',
  participation_count: 'participation_count',
} as const;

export interface Badge {
  id: number;
  name: string;
  description: string;
  unlockRule: string;
  unlockType?: BadgeUnlockType;
  unlockValue?: number;
  icon: string;
  isActive?: boolean;
}

export type BadgeInputUnlockType = typeof BadgeInputUnlockType[keyof typeof BadgeInputUnlockType];


export const BadgeInputUnlockType = {
  xp_threshold: 'xp_threshold',
  challenge_count: 'challenge_count',
  participation_count: 'participation_count',
} as const;

export interface BadgeInput {
  name: string;
  description: string;
  unlockRule: string;
  unlockType: BadgeInputUnlockType;
  unlockValue: number;
  icon: string;
  isActive?: boolean;
}

export interface BadgeUpdate {
  name?: string;
  description?: string;
  unlockRule?: string;
  unlockType?: string;
  unlockValue?: number;
  icon?: string;
  isActive?: boolean;
}

export interface EmployeeBadge {
  id: number;
  employeeId: number;
    employeeName?: string | null;
  badgeId: number;
    badgeName?: string | null;
    badgeIcon?: string | null;
  awardedAt: string;
}

export interface EmployeeBadgeInput {
  employeeId: number;
  badgeId: number;
}

export type RewardStatus = typeof RewardStatus[keyof typeof RewardStatus];


export const RewardStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface Reward {
  id: number;
  name: string;
  description: string;
  pointsRequired: number;
  stock: number;
  status: RewardStatus;
  redemptionCount?: number;
}

export type RewardInputStatus = typeof RewardInputStatus[keyof typeof RewardInputStatus];


export const RewardInputStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;

export interface RewardInput {
  name: string;
  description: string;
  pointsRequired: number;
  stock: number;
  status?: RewardInputStatus;
}

export interface RewardUpdate {
  name?: string;
  description?: string;
  pointsRequired?: number;
  stock?: number;
  status?: string;
}

export interface RewardRedemption {
  id: number;
  employeeId: number;
    employeeName?: string | null;
  rewardId: number;
    rewardName?: string | null;
  pointsSpent: number;
  redeemedAt: string;
}

export interface RewardRedemptionInput {
  employeeId: number;
  rewardId: number;
}

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

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];


export const NotificationType = {
  compliance_issue: 'compliance_issue',
  csr_approval: 'csr_approval',
  challenge_approval: 'challenge_approval',
  policy_reminder: 'policy_reminder',
  badge_unlock: 'badge_unlock',
  reward_redemption: 'reward_redemption',
} as const;

export interface Notification {
  id: number;
  employeeId: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PlatformSettings {
  id: number;
  autoEmissionCalculation?: boolean;
  evidenceRequired?: boolean;
  badgeAutoAward?: boolean;
  environmentalWeight?: number;
  socialWeight?: number;
  governanceWeight?: number;
  notifyComplianceIssue?: boolean;
  notifyCsrApproval?: boolean;
  notifyChallengeApproval?: boolean;
  notifyPolicyReminder?: boolean;
  notifyBadgeUnlock?: boolean;
  updatedAt?: string;
}

export interface PlatformSettingsUpdate {
  autoEmissionCalculation?: boolean;
  evidenceRequired?: boolean;
  badgeAutoAward?: boolean;
  environmentalWeight?: number;
  socialWeight?: number;
  governanceWeight?: number;
  notifyComplianceIssue?: boolean;
  notifyCsrApproval?: boolean;
  notifyChallengeApproval?: boolean;
  notifyPolicyReminder?: boolean;
  notifyBadgeUnlock?: boolean;
}

export interface ActivityItem {
  id: number;
  type: string;
  title: string;
    description?: string | null;
  createdAt: string;
}

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

export interface EmissionByDept {
  departmentId: number;
  departmentName: string;
  totalEmission: number;
}

export interface EmissionBySource {
  source: string;
  totalEmission: number;
}

export interface TrendPoint {
  period: string;
  value: number;
}

export interface EnvironmentalDashboard {
  totalEmissions?: number;
  emissionsByDepartment?: EmissionByDept[];
  emissionsBySource?: EmissionBySource[];
  emissionsTrend?: TrendPoint[];
  goalsProgress?: EnvironmentalGoal[];
  goalsAchieved?: number;
  goalsTotal?: number;
}

export interface ParticipationByDept {
  departmentName: string;
  count: number;
}

export interface GenderDist {
  gender: string;
  count: number;
  percent: number;
}

export interface TopParticipant {
  employeeId: number;
  employeeName: string;
  participationCount: number;
  pointsEarned: number;
}

export interface SocialDashboard {
  totalParticipations?: number;
  approvedParticipations?: number;
  pendingParticipations?: number;
  activeCsrActivities?: number;
  participationsByDepartment?: ParticipationByDept[];
  genderDistribution?: GenderDist[];
  topParticipants?: TopParticipant[];
}

export interface IssuesBySeverity {
  severity: string;
  count: number;
}

export interface GovernanceDashboard {
  activePolicies?: number;
  totalAcknowledgements?: number;
  acknowledgementRate?: number;
  totalAudits?: number;
  completedAudits?: number;
  openComplianceIssues?: number;
  overdueComplianceIssues?: number;
  issuesBySeverity?: IssuesBySeverity[];
  recentAudits?: Audit[];
}

export interface DepartmentRanking {
  rank: number;
  departmentId: number;
  departmentName: string;
  environmentalScore?: number;
  socialScore?: number;
  governanceScore?: number;
  totalScore: number;
}

export interface ReportPeriod {
  startDate: string;
  endDate: string;
}

export interface EnvironmentalReport {
  generatedAt?: string;
  period?: ReportPeriod;
  totalEmissions?: number;
  emissionsByDepartment?: EmissionByDept[];
  emissionsBySource?: EmissionBySource[];
  goalsStatus?: EnvironmentalGoal[];
  transactions?: CarbonTransaction[];
}

export interface ActivityByCategory {
  categoryName: string;
  count: number;
}

export interface SocialReport {
  generatedAt?: string;
  period?: ReportPeriod;
  totalParticipations?: number;
  approvalRate?: number;
  activitiesByCategory?: ActivityByCategory[];
  genderDistribution?: GenderDist[];
  topParticipants?: TopParticipant[];
}

export interface GovernanceReport {
  generatedAt?: string;
  period?: ReportPeriod;
  activePolicies?: number;
  acknowledgementRate?: number;
  auditsCompleted?: number;
  complianceIssuesRaised?: number;
  complianceIssuesResolved?: number;
  issuesBySeverity?: IssuesBySeverity[];
}

export interface EsgSummaryReport {
  generatedAt?: string;
  period?: ReportPeriod;
  overallScore?: number;
  environmentalScore?: number;
  socialScore?: number;
  governanceScore?: number;
  departmentRankings?: DepartmentRanking[];
  highlights?: string[];
}

export type ListCategoriesParams = {
type?: ListCategoriesType;
};

export type ListCategoriesType = typeof ListCategoriesType[keyof typeof ListCategoriesType];


export const ListCategoriesType = {
  csr_activity: 'csr_activity',
  challenge: 'challenge',
} as const;

export type ListCarbonTransactionsParams = {
departmentId?: number;
startDate?: string;
endDate?: string;
};

export type ListEmployeeParticipationsParams = {
employeeId?: number;
activityId?: number;
status?: string;
};

export type ListPolicyAcknowledgementsParams = {
policyId?: number;
employeeId?: number;
};

export type ListComplianceIssuesParams = {
auditId?: number;
status?: string;
overdue?: boolean;
};

export type ListChallengesParams = {
status?: string;
categoryId?: number;
};

export type ListChallengeParticipationsParams = {
challengeId?: number;
employeeId?: number;
};

export type ListEmployeeBadgesParams = {
employeeId?: number;
};

export type ListRewardRedemptionsParams = {
employeeId?: number;
};

export type GetLeaderboardParams = {
departmentId?: number;
limit?: number;
};

export type ListNotificationsParams = {
employeeId?: number;
unread?: boolean;
};

export type GetEnvironmentalDashboardParams = {
departmentId?: number;
startDate?: string;
endDate?: string;
};

export type GetEnvironmentalReportParams = {
departmentId?: number;
startDate?: string;
endDate?: string;
};

export type GetSocialReportParams = {
departmentId?: number;
startDate?: string;
endDate?: string;
employeeId?: number;
};

export type GetGovernanceReportParams = {
departmentId?: number;
startDate?: string;
endDate?: string;
};

export type GetEsgSummaryReportParams = {
departmentId?: number;
startDate?: string;
endDate?: string;
};

