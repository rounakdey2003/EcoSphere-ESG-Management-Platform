
export type NotificationType = typeof NotificationType[keyof typeof NotificationType];


export const NotificationType = {
  compliance_issue: 'compliance_issue',
  csr_approval: 'csr_approval',
  challenge_approval: 'challenge_approval',
  policy_reminder: 'policy_reminder',
  badge_unlock: 'badge_unlock',
  reward_redemption: 'reward_redemption',
} as const;
