
export type AuditStatus = typeof AuditStatus[keyof typeof AuditStatus];


export const AuditStatus = {
  scheduled: 'scheduled',
  in_progress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;
