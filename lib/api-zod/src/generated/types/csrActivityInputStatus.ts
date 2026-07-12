
export type CsrActivityInputStatus = typeof CsrActivityInputStatus[keyof typeof CsrActivityInputStatus];


export const CsrActivityInputStatus = {
  planned: 'planned',
  active: 'active',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;
