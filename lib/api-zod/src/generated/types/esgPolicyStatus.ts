
export type EsgPolicyStatus = typeof EsgPolicyStatus[keyof typeof EsgPolicyStatus];


export const EsgPolicyStatus = {
  draft: 'draft',
  active: 'active',
  archived: 'archived',
} as const;
