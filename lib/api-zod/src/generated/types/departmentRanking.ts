
export interface DepartmentRanking {
  rank: number;
  departmentId: number;
  departmentName: string;
  environmentalScore?: number;
  socialScore?: number;
  governanceScore?: number;
  totalScore: number;
}
