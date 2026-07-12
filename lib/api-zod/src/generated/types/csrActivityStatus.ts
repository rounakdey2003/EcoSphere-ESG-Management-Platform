
export type CsrActivityStatus = typeof CsrActivityStatus[keyof typeof CsrActivityStatus];


export const CsrActivityStatus = {
  planned: 'planned',
  active: 'active',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;
