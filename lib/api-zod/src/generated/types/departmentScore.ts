
export interface DepartmentScore {
  departmentId: number;
  departmentName?: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
  updatedAt?: Date;
}
