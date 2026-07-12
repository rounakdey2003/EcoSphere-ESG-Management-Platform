
export type EsgPolicyInputCategory = typeof EsgPolicyInputCategory[keyof typeof EsgPolicyInputCategory];


export const EsgPolicyInputCategory = {
  environmental: 'environmental',
  social: 'social',
  governance: 'governance',
} as const;
