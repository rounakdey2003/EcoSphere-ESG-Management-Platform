
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
