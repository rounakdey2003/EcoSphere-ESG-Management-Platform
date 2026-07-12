
export type EsgPolicyCategory = typeof EsgPolicyCategory[keyof typeof EsgPolicyCategory];


export const EsgPolicyCategory = {
  environmental: 'environmental',
  social: 'social',
  governance: 'governance',
} as const;
