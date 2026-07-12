import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db } from "@workspace/db";
import { GetEnvironmentalDashboardQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [empCount] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM employees WHERE status = 'active'`)).rows as any[];
  const [emissions] = (await db.execute(sql`SELECT COALESCE(SUM(total_emission::numeric), 0) as total FROM carbon_transactions`)).rows as any[];
  const [challenges] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM challenges WHERE status = 'active'`)).rows as any[];
  const [participations] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM employee_participations WHERE approval_status = 'pending'`)).rows as any[];
  const [openIssues] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM compliance_issues WHERE status IN ('open', 'in_progress')`)).rows as any[];
  const today = new Date().toISOString().split("T")[0];
  const [overdueIssues] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM compliance_issues WHERE due_date < ${today} AND status NOT IN ('resolved')`)).rows as any[];

  // Compute scores (intensity-based, normalized 0-100)
  const totalEmissions = Number(emissions.total);
  const totalEmp = Math.max(Number(empCount.count), 1);
  // Environmental: tCO2e per employee lifetime; benchmark 10000 = score 0, 0 = score 100
  const intensityPerEmp = totalEmissions / totalEmp;
  const envScore = Math.max(0, Math.min(100, Math.round((1 - intensityPerEmp / 10000) * 100 * 10) / 10));
  // Social: approved participations vs 50% of workforce (each employee expected to do ≥1 activity)
  const [approvedParticipations] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM employee_participations WHERE approval_status = 'approved'`)).rows as any[];
  const socialScore = Math.min(100, Math.round((Number(approvedParticipations.count) / Math.max(totalEmp * 0.5, 1)) * 100 * 10) / 10);
  const govScore = Math.max(0, Math.round((100 - Number(openIssues.count) * 10) * 10) / 10);
  // Fetch configurable weights from platform_settings
  const [settingsRow] = (await db.execute(sql`SELECT environmental_weight, social_weight, governance_weight FROM platform_settings LIMIT 1`)).rows as any[];
  const envWeight = settingsRow ? Number(settingsRow.environmental_weight) / 100 : 0.4;
  const socialWeight = settingsRow ? Number(settingsRow.social_weight) / 100 : 0.3;
  const govWeight = settingsRow ? Number(settingsRow.governance_weight) / 100 : 0.3;
  const overallEsgScore = Math.round((envScore * envWeight + socialScore * socialWeight + govScore * govWeight) * 10) / 10;


  
  const recentActivity = (await db.execute(sql`
    (SELECT 'carbon_transaction' as type, 'Carbon Transaction' as title, description, created_at FROM carbon_transactions ORDER BY created_at DESC LIMIT 3)
    UNION ALL
    (SELECT 'csr_participation' as type, 'CSR Participation' as title, NULL as description, submitted_at FROM employee_participations ORDER BY submitted_at DESC LIMIT 3)
    UNION ALL
    (SELECT 'compliance_issue' as type, 'Compliance Issue' as title, description, created_at FROM compliance_issues ORDER BY created_at DESC LIMIT 3)
    ORDER BY created_at DESC
    LIMIT 8
  `)).rows.map((r: any, i: number) => ({ id: i + 1, type: r.type, title: r.title, description: r.description, createdAt: r.created_at }));

  res.json({
    overallEsgScore: Math.round(overallEsgScore * 10) / 10,
    environmentalScore: Math.round(envScore * 10) / 10,
    socialScore: Math.round(socialScore * 10) / 10,
    governanceScore: Math.round(govScore * 10) / 10,
    totalCarbonEmissions: Math.round(totalEmissions * 100) / 100,
    activeChallenges: Number(challenges.count),
    totalEmployees: Number(empCount.count),
    activeParticipations: Number(participations.count),
    openComplianceIssues: Number(openIssues.count),
    overdueComplianceIssues: Number(overdueIssues.count),
    recentActivity,
  });
});

router.get("/dashboard/environmental", async (req, res): Promise<void> => {
  const query = GetEnvironmentalDashboardQueryParams.safeParse(req.query);

  const emissionsByDept = (await db.execute(sql`
    SELECT d.name as department_name, d.id as department_id,
           COALESCE(SUM(ct.total_emission::numeric), 0) as total_emission
    FROM departments d
    LEFT JOIN carbon_transactions ct ON ct.department_id = d.id
    GROUP BY d.id, d.name
    ORDER BY total_emission DESC
  `)).rows.map((r: any) => ({ departmentId: r.department_id, departmentName: r.department_name, totalEmission: Number(r.total_emission) }));

  const emissionsBySource = (await db.execute(sql`
    SELECT source, COALESCE(SUM(total_emission::numeric), 0) as total_emission
    FROM carbon_transactions
    GROUP BY source
    ORDER BY total_emission DESC
  `)).rows.map((r: any) => ({ source: r.source, totalEmission: Number(r.total_emission) }));

  const emissionsTrend = (await db.execute(sql`
    SELECT TO_CHAR(transaction_date::date, 'YYYY-MM') as period,
           SUM(total_emission::numeric) as value
    FROM carbon_transactions
    GROUP BY period
    ORDER BY period
    LIMIT 12
  `)).rows.map((r: any) => ({ period: r.period, value: Number(r.value) }));

  const goals = (await db.execute(sql`SELECT * FROM environmental_goals ORDER BY deadline`)).rows.map((r: any) => ({
    id: r.id, title: r.title, description: r.description, departmentId: r.department_id, departmentName: null,
    targetValue: Number(r.target_value), currentValue: Number(r.current_value), unit: r.unit,
    deadline: r.deadline, status: r.status,
    progressPercent: r.target_value > 0 ? Math.min(Math.round((Number(r.current_value) / Number(r.target_value)) * 100), 100) : 0,
  }));

  const [goalsStats] = (await db.execute(sql`
    SELECT COUNT(*) FILTER (WHERE status = 'achieved')::int as achieved,
           COUNT(*)::int as total FROM environmental_goals
  `)).rows as any[];

  res.json({
    totalEmissions: emissionsByDept.reduce((sum, d) => sum + d.totalEmission, 0),
    emissionsByDepartment: emissionsByDept,
    emissionsBySource,
    emissionsTrend,
    goalsProgress: goals,
    goalsAchieved: Number(goalsStats.achieved),
    goalsTotal: Number(goalsStats.total),
  });
});

router.get("/dashboard/social", async (_req, res): Promise<void> => {
  const [totals] = (await db.execute(sql`
    SELECT COUNT(*)::int as total,
           COUNT(*) FILTER (WHERE approval_status = 'approved')::int as approved,
           COUNT(*) FILTER (WHERE approval_status = 'pending')::int as pending
    FROM employee_participations
  `)).rows as any[];

  const [activeActivities] = (await db.execute(sql`SELECT COUNT(*)::int as count FROM csr_activities WHERE status = 'active'`)).rows as any[];

  const byDept = (await db.execute(sql`
    SELECT d.name as department_name, COUNT(ep.id)::int as count
    FROM departments d
    LEFT JOIN employees e ON e.department_id = d.id
    LEFT JOIN employee_participations ep ON ep.employee_id = e.id
    GROUP BY d.name
    ORDER BY count DESC
  `)).rows.map((r: any) => ({ departmentName: r.department_name, count: Number(r.count) }));

  const totalEmployees = Number((await db.execute(sql`SELECT COUNT(*)::int as c FROM employees WHERE status = 'active'`)).rows[0]?.c ?? 0);
  const genderRaw = (await db.execute(sql`
    SELECT COALESCE(gender, 'prefer_not_to_say') as gender, COUNT(*)::int as count
    FROM employees WHERE status = 'active' GROUP BY gender
  `)).rows as any[];
  const genderDistribution = genderRaw.map((r: any) => ({
    gender: r.gender, count: Number(r.count),
    percent: totalEmployees > 0 ? Math.round((Number(r.count) / totalEmployees) * 100 * 10) / 10 : 0,
  }));

  const topParticipants = (await db.execute(sql`
    SELECT e.id as employee_id, e.name as employee_name,
           COUNT(ep.id)::int as participation_count, COALESCE(SUM(ep.points_earned), 0)::int as points_earned
    FROM employees e
    LEFT JOIN employee_participations ep ON ep.employee_id = e.id
    GROUP BY e.id, e.name
    ORDER BY participation_count DESC
    LIMIT 5
  `)).rows.map((r: any) => ({ employeeId: r.employee_id, employeeName: r.employee_name, participationCount: Number(r.participation_count), pointsEarned: Number(r.points_earned) }));

  res.json({
    totalParticipations: Number(totals.total),
    approvedParticipations: Number(totals.approved),
    pendingParticipations: Number(totals.pending),
    activeCsrActivities: Number(activeActivities.count),
    participationsByDepartment: byDept,
    genderDistribution,
    topParticipants,
  });
});

router.get("/dashboard/governance", async (_req, res): Promise<void> => {
  const [policies] = (await db.execute(sql`SELECT COUNT(*) FILTER (WHERE status = 'active')::int as active FROM esg_policies`)).rows as any[];
  const totalEmployees = Number((await db.execute(sql`SELECT COUNT(*)::int as c FROM employees WHERE status = 'active'`)).rows[0]?.c ?? 0);
  const [acks] = (await db.execute(sql`SELECT COUNT(*)::int as total FROM policy_acknowledgements`)).rows as any[];
  const totalPossible = Number(policies.active) * totalEmployees;
  const ackRate = totalPossible > 0 ? Math.round((Number(acks.total) / totalPossible) * 100) : 0;

  const [auditStats] = (await db.execute(sql`
    SELECT COUNT(*)::int as total,
           COUNT(*) FILTER (WHERE status = 'completed')::int as completed FROM audits
  `)).rows as any[];

  const [issueStats] = (await db.execute(sql`
    SELECT COUNT(*) FILTER (WHERE status IN ('open', 'in_progress'))::int as open_count,
           COUNT(*) FILTER (WHERE due_date < NOW()::date AND status NOT IN ('resolved'))::int as overdue_count
    FROM compliance_issues
  `)).rows as any[];

  const issuesBySeverity = (await db.execute(sql`
    SELECT severity, COUNT(*)::int as count FROM compliance_issues GROUP BY severity
  `)).rows.map((r: any) => ({ severity: r.severity, count: Number(r.count) }));

  const recentAudits = (await db.execute(sql`
    SELECT a.*, d.name as department_name, COUNT(ci.id)::int as issue_count
    FROM audits a
    LEFT JOIN departments d ON a.department_id = d.id
    LEFT JOIN compliance_issues ci ON ci.audit_id = a.id
    GROUP BY a.id, d.name
    ORDER BY a.created_at DESC LIMIT 5
  `)).rows.map((r: any) => ({ id: r.id, title: r.title, description: r.description, auditor: r.auditor, departmentId: r.department_id, departmentName: r.department_name, auditDate: r.audit_date, status: r.status, issueCount: Number(r.issue_count) }));

  res.json({
    activePolicies: Number(policies.active),
    totalAcknowledgements: Number(acks.total),
    acknowledgementRate: ackRate,
    totalAudits: Number(auditStats.total),
    completedAudits: Number(auditStats.completed),
    openComplianceIssues: Number(issueStats.open_count),
    overdueComplianceIssues: Number(issueStats.overdue_count),
    issuesBySeverity,
    recentAudits,
  });
});

router.get("/dashboard/department-rankings", async (_req, res): Promise<void> => {
  const depts = (await db.execute(sql`SELECT id, name FROM departments WHERE status = 'active' ORDER BY name`)).rows as any[];

  const rankings = await Promise.all(depts.map(async (dept: any) => {
    const [emissions] = (await db.execute(sql`SELECT COALESCE(SUM(total_emission::numeric), 0) as total FROM carbon_transactions WHERE department_id = ${dept.id}`)).rows as any[];
    const envScore = Math.max(0, 100 - Math.min(Number(emissions.total) / 100, 100));

    const [social] = (await db.execute(sql`
      SELECT COUNT(*)::int as count FROM employee_participations ep
      JOIN employees e ON ep.employee_id = e.id
      WHERE e.department_id = ${dept.id} AND ep.approval_status = 'approved'
    `)).rows as any[];
    const socialScore = Math.min(Number(social.count) * 10, 100);

    const [gov] = (await db.execute(sql`
      SELECT COUNT(*)::int as count FROM compliance_issues ci
      JOIN audits a ON ci.audit_id = a.id
      WHERE a.department_id = ${dept.id} AND ci.status IN ('open', 'in_progress')
    `)).rows as any[];
    const govScore = Math.max(0, 100 - Number(gov.count) * 15);

    const totalScore = envScore * 0.4 + socialScore * 0.3 + govScore * 0.3;
    return { departmentId: dept.id, departmentName: dept.name, environmentalScore: Math.round(envScore * 10) / 10, socialScore: Math.round(socialScore * 10) / 10, governanceScore: Math.round(govScore * 10) / 10, totalScore: Math.round(totalScore * 10) / 10 };
  }));

  const sorted = rankings.sort((a, b) => b.totalScore - a.totalScore).map((r, i) => ({ rank: i + 1, ...r }));
  res.json(sorted);
});

export default router;
