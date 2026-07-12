import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, departmentsTable, carbonTransactionsTable, employeeParticipationsTable, complianceIssuesTable } from "@workspace/db";
import {
  CreateDepartmentBody,
  UpdateDepartmentBody,
  UpdateDepartmentParams,
  DeleteDepartmentParams,
  GetDepartmentParams,
  GetDepartmentScoreParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/departments", async (_req, res): Promise<void> => {
  const rows = await db.select().from(departmentsTable).orderBy(departmentsTable.name);
  res.json(rows);
});

router.post("/departments", async (req, res): Promise<void> => {
  const parsed = CreateDepartmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [dept] = await db.insert(departmentsTable).values(parsed.data).returning();
  res.status(201).json(dept);
});

router.get("/departments/:id", async (req, res): Promise<void> => {
  const params = GetDepartmentParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [dept] = await db.select().from(departmentsTable).where(eq(departmentsTable.id, params.data.id));
  if (!dept) { res.status(404).json({ error: "Department not found" }); return; }
  res.json(dept);
});

router.patch("/departments/:id", async (req, res): Promise<void> => {
  const params = UpdateDepartmentParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateDepartmentBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [dept] = await db.update(departmentsTable).set(parsed.data).where(eq(departmentsTable.id, params.data.id)).returning();
  if (!dept) { res.status(404).json({ error: "Department not found" }); return; }
  res.json(dept);
});

router.delete("/departments/:id", async (req, res): Promise<void> => {
  const params = DeleteDepartmentParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [dept] = await db.delete(departmentsTable).where(eq(departmentsTable.id, params.data.id)).returning();
  if (!dept) { res.status(404).json({ error: "Department not found" }); return; }
  res.sendStatus(204);
});

router.get("/departments/:id/score", async (req, res): Promise<void> => {
  const params = GetDepartmentScoreParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const { id } = params.data;

  const [dept] = await db.select().from(departmentsTable).where(eq(departmentsTable.id, id));
  if (!dept) { res.status(404).json({ error: "Department not found" }); return; }

  
  const emissionsResult = await db.execute(
    sql`SELECT COALESCE(SUM(total_emission::numeric), 0) as total FROM carbon_transactions WHERE department_id = ${id}`
  );
  const totalEmissions = Number((emissionsResult.rows[0] as any)?.total ?? 0);
  const envScore = Math.max(0, 100 - Math.min(totalEmissions / 100, 100));

  // Social: based on approved participations
  const socialResult = await db.execute(
    sql`SELECT COUNT(*) as count FROM employee_participations ep 
        JOIN employees e ON ep.employee_id = e.id 
        WHERE e.department_id = ${id} AND ep.approval_status = 'approved'`
  );
  const approvedCount = Number((socialResult.rows[0] as any)?.count ?? 0);
  const socialScore = Math.min(approvedCount * 10, 100);

  // Governance: based on open compliance issues
  const govResult = await db.execute(
    sql`SELECT COUNT(*) as count FROM compliance_issues ci
        JOIN audits a ON ci.audit_id = a.id
        WHERE a.department_id = ${id} AND ci.status IN ('open', 'in_progress')`
  );
  const openIssues = Number((govResult.rows[0] as any)?.count ?? 0);
  const govScore = Math.max(0, 100 - openIssues * 15);

  const totalScore = envScore * 0.4 + socialScore * 0.3 + govScore * 0.3;

  res.json({
    departmentId: id,
    departmentName: dept.name,
    environmentalScore: Math.round(envScore * 10) / 10,
    socialScore: Math.round(socialScore * 10) / 10,
    governanceScore: Math.round(govScore * 10) / 10,
    totalScore: Math.round(totalScore * 10) / 10,
    updatedAt: new Date().toISOString(),
  });
});

export default router;
