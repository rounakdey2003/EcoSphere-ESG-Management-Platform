
export type EsgPolicyInputStatus = typeof EsgPolicyInputStatus[keyof typeof EsgPolicyInputStatus];


export const EsgPolicyInputStatus = {
  draft: 'draft',
  active: 'active',
  archived: 'archived',
} as const;
