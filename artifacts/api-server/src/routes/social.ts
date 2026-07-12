import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, csrActivitiesTable, employeeParticipationsTable, employeesTable, categoriesTable } from "@workspace/db";
import {
  CreateCsrActivityBody,
  UpdateCsrActivityBody,
  UpdateCsrActivityParams,
  DeleteCsrActivityParams,
  GetCsrActivityParams,
  CreateEmployeeParticipationBody,
  UpdateEmployeeParticipationBody,
  UpdateEmployeeParticipationParams,
  ListEmployeeParticipationsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();



router.get("/csr-activities", async (_req, res): Promise<void> => {
  const rows = await db.execute(sql`
    SELECT ca.*, c.name as category_name, d.name as department_name,
           COUNT(ep.id)::int as participant_count
    FROM csr_activities ca
    LEFT JOIN categories c ON ca.category_id = c.id
    LEFT JOIN departments d ON ca.department_id = d.id
    LEFT JOIN employee_participations ep ON ep.activity_id = ca.id
    GROUP BY ca.id, c.name, d.name
    ORDER BY ca.start_date DESC
  `);
  res.json(rows.rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    categoryId: r.category_id,
    categoryName: r.category_name,
    departmentId: r.department_id,
    departmentName: r.department_name,
    points: r.points,
    startDate: r.start_date,
    endDate: r.end_date,
    status: r.status,
    participantCount: Number(r.participant_count),
  })));
});

router.post("/csr-activities", async (req, res): Promise<void> => {
  const parsed = CreateCsrActivityBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.startDate instanceof Date) values.startDate = values.startDate.toISOString().split("T")[0];
  if (values.endDate instanceof Date) values.endDate = values.endDate.toISOString().split("T")[0];
  const [act] = await db.insert(csrActivitiesTable).values(values).returning();
  res.status(201).json({ ...act, categoryName: null, departmentName: null, participantCount: 0 });
});

router.get("/csr-activities/:id", async (req, res): Promise<void> => {
  const params = GetCsrActivityParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT ca.*, c.name as category_name, d.name as department_name,
           COUNT(ep.id)::int as participant_count
    FROM csr_activities ca
    LEFT JOIN categories c ON ca.category_id = c.id
    LEFT JOIN departments d ON ca.department_id = d.id
    LEFT JOIN employee_participations ep ON ep.activity_id = ca.id
    WHERE ca.id = ${params.data.id}
    GROUP BY ca.id, c.name, d.name
  `);
  const r = rows.rows[0] as any;
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ id: r.id, title: r.title, description: r.description, categoryId: r.category_id, categoryName: r.category_name, departmentId: r.department_id, departmentName: r.department_name, points: r.points, startDate: r.start_date, endDate: r.end_date, status: r.status, participantCount: Number(r.participant_count) });
});

router.patch("/csr-activities/:id", async (req, res): Promise<void> => {
  const params = UpdateCsrActivityParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateCsrActivityBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData = { ...parsed.data } as any;
  if (updateData.startDate instanceof Date) updateData.startDate = updateData.startDate.toISOString().split("T")[0];
  if (updateData.endDate instanceof Date) updateData.endDate = updateData.endDate.toISOString().split("T")[0];
  const [act] = await db.update(csrActivitiesTable).set(updateData).where(eq(csrActivitiesTable.id, params.data.id)).returning();
  if (!act) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...act, categoryName: null, departmentName: null, participantCount: 0 });
});

router.delete("/csr-activities/:id", async (req, res): Promise<void> => {
  const params = DeleteCsrActivityParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [act] = await db.delete(csrActivitiesTable).where(eq(csrActivitiesTable.id, params.data.id)).returning();
  if (!act) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

// ── Employee Participations ────────────────────────────────────────────────

router.get("/employee-participations", async (req, res): Promise<void> => {
  const query = ListEmployeeParticipationsQueryParams.safeParse(req.query);
  const rows = await db.execute(sql`
    SELECT ep.*, e.name as employee_name, ca.title as activity_title
    FROM employee_participations ep
    LEFT JOIN employees e ON ep.employee_id = e.id
    LEFT JOIN csr_activities ca ON ep.activity_id = ca.id
    ORDER BY ep.submitted_at DESC
  `);

  let result = rows.rows.map((r: any) => ({
    id: r.id,
    employeeId: r.employee_id,
    employeeName: r.employee_name,
    activityId: r.activity_id,
    activityTitle: r.activity_title,
    proof: r.proof,
    approvalStatus: r.approval_status,
    pointsEarned: r.points_earned,
    completionDate: r.completion_date,
    submittedAt: r.submitted_at,
  }));

  if (query.success) {
    if (query.data.employeeId) result = result.filter(r => r.employeeId === query.data.employeeId);
    if (query.data.activityId) result = result.filter(r => r.activityId === query.data.activityId);
    if (query.data.status) result = result.filter(r => r.approvalStatus === query.data.status);
  }

  res.json(result);
});

router.post("/employee-participations", async (req, res): Promise<void> => {
  const parsed = CreateEmployeeParticipationBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.completionDate instanceof Date) values.completionDate = values.completionDate.toISOString().split("T")[0];
  const [ep] = await db.insert(employeeParticipationsTable).values(values).returning();
  res.status(201).json({ ...ep, employeeName: null, activityTitle: null });
});

router.patch("/employee-participations/:id", async (req, res): Promise<void> => {
  const params = UpdateEmployeeParticipationParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateEmployeeParticipationBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const updateData: any = { ...parsed.data };

  // If approved, award points
  if (updateData.approvalStatus === "approved" && updateData.pointsEarned === undefined) {
    const [ep] = await db.select().from(employeeParticipationsTable).where(eq(employeeParticipationsTable.id, params.data.id));
    if (ep) {
      const [activity] = await db.select().from(csrActivitiesTable).where(eq(csrActivitiesTable.id, ep.activityId));
      if (activity) {
        updateData.pointsEarned = activity.points;
        // Update employee points
        await db.execute(sql`UPDATE employees SET total_points = total_points + ${activity.points} WHERE id = ${ep.employeeId}`);
      }
    }
  }

  const [ep] = await db.update(employeeParticipationsTable).set(updateData).where(eq(employeeParticipationsTable.id, params.data.id)).returning();
  if (!ep) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...ep, employeeName: null, activityTitle: null });
});

export default router;
