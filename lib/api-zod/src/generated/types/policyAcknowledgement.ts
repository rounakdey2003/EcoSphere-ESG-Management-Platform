
export interface PolicyAcknowledgement {
  id: number;
  policyId: number;
    policyTitle?: string | null;
  employeeId: number;
    employeeName?: string | null;
  acknowledgedAt: Date;
}
