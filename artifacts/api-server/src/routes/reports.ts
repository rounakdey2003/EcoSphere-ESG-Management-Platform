import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  GetEnvironmentalReportQueryParams,
  GetSocialReportQueryParams,
  GetGovernanceReportQueryParams,
  GetEsgSummaryReportQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/reports/environmental", async (req, res): Promise<void> => {
  const query = GetEnvironmentalReportQueryParams.safeParse(req.query);
  const startDate = (query.success && query.data.startDate) || "2020-01-01";
  const endDate = (query.success && query.data.endDate) || new Date().toISOString().split("T")[0];

  const transactions = (await db.execute(sql`
    SELECT ct.*, d.name as department_name, ef.name as emission_factor_name
    FROM carbon_transactions ct
    LEFT JOIN departments d ON ct.department_id = d.id
    LEFT JOIN emission_factors ef ON ct.emission_factor_id = ef.id
    WHERE ct.transaction_date >= ${startDate} AND ct.transaction_date <= ${endDate}
    ORDER BY ct.transaction_date DESC
  `)).rows.map((r: any) => ({
    id: r.id, departmentId: r.department_id, departmentName: r.department_name,
    emissionFactorId: r.emission_factor_id, emissionFactorName: r.emission_factor_name,
    quantity: Number(r.quantity), totalEmission: Number(r.total_emission),
    source: r.source, description: r.description, transactionDate: r.transaction_date, createdAt: r.created_at,
  }));

  const emissionsByDepartment = (await db.execute(sql`
    SELECT d.id as department_id, d.name as department_name,
           COALESCE(SUM(ct.total_emission::numeric), 0) as total_emission
    FROM departments d
    LEFT JOIN carbon_transactions ct ON ct.department_id = d.id AND ct.transaction_date >= ${startDate} AND ct.transaction_date <= ${endDate}
    GROUP BY d.id, d.name ORDER BY total_emission DESC
  `)).rows.map((r: any) => ({ departmentId: r.department_id, departmentName: r.department_name, totalEmission: Number(r.total_emission) }));

  const totalEmissions = emissionsByDepartment.reduce((s, d) => s + d.totalEmission, 0);

  const emissionsBySource = (await db.execute(sql`
    SELECT source, COALESCE(SUM(total_emission::numeric), 0) as total_emission
    FROM carbon_transactions
    WHERE transaction_date >= ${startDate} AND transaction_date <= ${endDate}
    GROUP BY source ORDER BY total_emission DESC
  `)).rows.map((r: any) => ({ source: r.source, totalEmission: Number(r.total_emission) }));

  const goalsStatus = (await db.execute(sql`SELECT * FROM environmental_goals ORDER BY deadline`)).rows.map((r: any) => ({
    id: r.id, title: r.title, description: r.description, departmentId: r.department_id, departmentName: null,
    targetValue: Number(r.target_value), currentValue: Number(r.current_value), unit: r.unit,
    deadline: r.deadline, status: r.status,
    progressPercent: Number(r.target_value) > 0 ? Math.min(Math.round((Number(r.current_value) / Number(r.target_value)) * 100), 100) : 0,
  }));

  res.json({
    generatedAt: new Date().toISOString(),
    period: { startDate, endDate },
    totalEmissions,
    emissionsByDepartment,
    emissionsBySource,
    goalsStatus,
    transactions,
  });
});

router.get("/reports/social", async (req, res): Promise<void> => {
  const query = GetSocialReportQueryParams.safeParse(req.query);
  const startDate = (query.success && query.data.startDate) || "2020-01-01";
  const endDate = (query.success && query.data.endDate) || new Date().toISOString().split("T")[0];

  const [totals] = (await db.execute(sql`
    SELECT COUNT(*)::int as total, COUNT(*) FILTER (WHERE approval_status = 'approved')::int as approved
    FROM employee_participations WHERE submitted_at::date >= ${startDate} AND submitted_at::date <= ${endDate}
  `)).rows as any[];

  const approvalRate = Number(totals.total) > 0 ? Math.round((Number(totals.approved) / Number(totals.total)) * 100) : 0;

  const activitiesByCategory = (await db.execute(sql`
    SELECT cat.name as category_name, COUNT(ca.id)::int as count
    FROM csr_activities ca
    LEFT JOIN categories cat ON ca.category_id = cat.id
    GROUP BY cat.name ORDER BY count DESC
  `)).rows.map((r: any) => ({ categoryName: r.category_name, count: Number(r.count) }));

  const totalEmployees = Number((await db.execute(sql`SELECT COUNT(*)::int as c FROM employees WHERE status = 'active'`)).rows[0]?.c ?? 0);
  const genderRaw = (await db.execute(sql`
    SELECT COALESCE(gender, 'prefer_not_to_say') as gender, COUNT(*)::int as count FROM employees WHERE status = 'active' GROUP BY gender
  `)).rows as any[];
  const genderDistribution = genderRaw.map((r: any) => ({
    gender: r.gender, count: Number(r.count),
    percent: totalEmployees > 0 ? Math.round((Number(r.count) / totalEmployees) * 100 * 10) / 10 : 0,
  }));

  const topParticipants = (await db.execute(sql`
    SELECT e.id as employee_id, e.name as employee_name,
           COUNT(ep.id)::int as participation_count, COALESCE(SUM(ep.points_earned), 0)::int as points_earned
    FROM employees e LEFT JOIN employee_participations ep ON ep.employee_id = e.id
    GROUP BY e.id, e.name ORDER BY participation_count DESC LIMIT 10
  `)).rows.map((r: any) => ({ employeeId: r.employee_id, employeeName: r.employee_name, participationCount: Number(r.participation_count), pointsEarned: Number(r.points_earned) }));

  res.json({
    generatedAt: new Date().toISOString(),
    period: { startDate, endDate },
    totalParticipations: Number(totals.total),
    approvalRate,
    activitiesByCategory,
    genderDistribution,
    topParticipants,
  });
});

router.get("/reports/governance", async (req, res): Promise<void> => {
  const query = GetGovernanceReportQueryParams.safeParse(req.query);
  const startDate = (query.success && query.data.startDate) || "2020-01-01";
  const endDate = (query.success && query.data.endDate) || new Date().toISOString().split("T")[0];

  const [policies] = (await db.execute(sql`SELECT COUNT(*) FILTER (WHERE status = 'active')::int as active FROM esg_policies`)).rows as any[];
  const totalEmployees = Number((await db.execute(sql`SELECT COUNT(*)::int as c FROM employees WHERE status = 'active'`)).rows[0]?.c ?? 0);
  const [acks] = (await db.execute(sql`SELECT COUNT(*)::int as total FROM policy_acknowledgements`)).rows as any[];
  const totalPossible = Number(policies.active) * totalEmployees;
  const ackRate = totalPossible > 0 ? Math.round((Number(acks.total) / totalPossible) * 100) : 0;

  const [auditStats] = (await db.execute(sql`
    SELECT COUNT(*) FILTER (WHERE status = 'completed')::int as completed FROM audits
    WHERE audit_date >= ${startDate} AND audit_date <= ${endDate}
  `)).rows as any[];

  const [issueStats] = (await db.execute(sql`
    SELECT COUNT(*)::int as raised, COUNT(*) FILTER (WHERE status = 'resolved')::int as resolved
    FROM compliance_issues WHERE created_at::date >= ${startDate} AND created_at::date <= ${endDate}
  `)).rows as any[];

  const issuesBySeverity = (await db.execute(sql`
    SELECT severity, COUNT(*)::int as count FROM compliance_issues
    WHERE created_at::date >= ${startDate} AND created_at::date <= ${endDate}
    GROUP BY severity
  `)).rows.map((r: any) => ({ severity: r.severity, count: Number(r.count) }));

  res.json({
    generatedAt: new Date().toISOString(),
    period: { startDate, endDate },
    activePolicies: Number(policies.active),
    acknowledgementRate: ackRate,
    auditsCompleted: Number(auditStats.completed),
    complianceIssuesRaised: Number(issueStats.raised),
    complianceIssuesResolved: Number(issueStats.resolved),
    issuesBySeverity,
  });
});

router.get("/reports/esg-summary", async (req, res): Promise<void> => {
  const query = GetEsgSummaryReportQueryParams.safeParse(req.query);

  const [emissions] = (await db.execute(sql`SELECT COALESCE(SUM(total_emission::numeric), 0) as total FROM carbon_transactions`)).rows as any[];
  const envScore = Math.max(0, 100 - Math.min(Number(emissions.total) / 500, 100));
  const [approved] = (await db.execute(sql`SELECT COUNT(*)::int as c FROM employee_participations WHERE approval_status = 'approved'`)).rows as any[];
  const socialScore = Math.min(Number(approved.c) * 5, 100);
  const [openIssues] = (await db.execute(sql`SELECT COUNT(*)::int as c FROM compliance_issues WHERE status IN ('open', 'in_progress')`)).rows as any[];
  const govScore = Math.max(0, 100 - Number(openIssues.c) * 10);
  const overallScore = envScore * 0.4 + socialScore * 0.3 + govScore * 0.3;

  // Department rankings
  const depts = (await db.execute(sql`SELECT id, name FROM departments WHERE status = 'active' ORDER BY name`)).rows as any[];
  const rankings = await Promise.all(depts.map(async (dept: any) => {
    const [em] = (await db.execute(sql`SELECT COALESCE(SUM(total_emission::numeric), 0) as total FROM carbon_transactions WHERE department_id = ${dept.id}`)).rows as any[];
    const e = Math.max(0, 100 - Math.min(Number(em.total) / 100, 100));
    const [so] = (await db.execute(sql`SELECT COUNT(*)::int as c FROM employee_participations ep JOIN employees emp ON ep.employee_id = emp.id WHERE emp.department_id = ${dept.id} AND ep.approval_status = 'approved'`)).rows as any[];
    const s = Math.min(Number(so.c) * 10, 100);
    const [go] = (await db.execute(sql`SELECT COUNT(*)::int as c FROM compliance_issues ci JOIN audits a ON ci.audit_id = a.id WHERE a.department_id = ${dept.id} AND ci.status IN ('open', 'in_progress')`)).rows as any[];
    const g = Math.max(0, 100 - Number(go.c) * 15);
    const total = e * 0.4 + s * 0.3 + g * 0.3;
    return { departmentId: dept.id, departmentName: dept.name, environmentalScore: Math.round(e * 10) / 10, socialScore: Math.round(s * 10) / 10, governanceScore: Math.round(g * 10) / 10, totalScore: Math.round(total * 10) / 10 };
  }));
  const sorted = rankings.sort((a, b) => b.totalScore - a.totalScore).map((r, i) => ({ rank: i + 1, ...r }));

  res.json({
    generatedAt: new Date().toISOString(),
    period: { startDate: "2020-01-01", endDate: new Date().toISOString().split("T")[0] },
    overallScore: Math.round(overallScore * 10) / 10,
    environmentalScore: Math.round(envScore * 10) / 10,
    socialScore: Math.round(socialScore * 10) / 10,
    governanceScore: Math.round(govScore * 10) / 10,
    departmentRankings: sorted,
    highlights: [
      `Overall ESG score: ${Math.round(overallScore * 10) / 10}`,
      `${Number(approved.c)} CSR participations approved`,
      `${sorted[0]?.departmentName ?? "N/A"} is the top performing department`,
    ],
  });
});

export default router;
