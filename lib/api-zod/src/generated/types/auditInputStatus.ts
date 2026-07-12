
export type AuditInputStatus = typeof AuditInputStatus[keyof typeof AuditInputStatus];


export const AuditInputStatus = {
  scheduled: 'scheduled',
  in_progress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;
