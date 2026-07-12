import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, employeesTable, departmentsTable } from "@workspace/db";
import {
  CreateEmployeeBody,
  UpdateEmployeeBody,
  UpdateEmployeeParams,
  GetEmployeeParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/employees", async (_req, res): Promise<void> => {
  const rows = await db.execute(sql`
    SELECT e.*, d.name as department_name
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    ORDER BY e.name
  `);
  const employees = rows.rows.map((e: any) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    role: e.role,
    departmentId: e.department_id,
    departmentName: e.department_name,
    gender: e.gender,
    xp: e.xp,
    totalPoints: e.total_points,
    joinedAt: e.joined_at,
    status: e.status,
  }));
  res.json(employees);
});

router.post("/employees", async (req, res): Promise<void> => {
  const parsed = CreateEmployeeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.joinedAt instanceof Date) values.joinedAt = values.joinedAt.toISOString().split("T")[0];
  const [emp] = await db.insert(employeesTable).values(values).returning();
  const [dept] = emp.departmentId
    ? await db.select().from(departmentsTable).where(eq(departmentsTable.id, emp.departmentId))
    : [undefined];
  res.status(201).json({ ...emp, departmentName: dept?.name ?? null });
});

router.get("/employees/:id", async (req, res): Promise<void> => {
  const params = GetEmployeeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT e.*, d.name as department_name
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    WHERE e.id = ${params.data.id}
  `);
  const e = rows.rows[0] as any;
  if (!e) { res.status(404).json({ error: "Employee not found" }); return; }
  res.json({
    id: e.id,
    name: e.name,
    email: e.email,
    role: e.role,
    departmentId: e.department_id,
    departmentName: e.department_name,
    gender: e.gender,
    xp: e.xp,
    totalPoints: e.total_points,
    joinedAt: e.joined_at,
    status: e.status,
  });
});

router.patch("/employees/:id", async (req, res): Promise<void> => {
  const params = UpdateEmployeeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateEmployeeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData = { ...parsed.data } as any;
  if (updateData.joinedAt instanceof Date) updateData.joinedAt = updateData.joinedAt.toISOString().split("T")[0];
  const [emp] = await db.update(employeesTable).set(updateData).where(eq(employeesTable.id, params.data.id)).returning();
  if (!emp) { res.status(404).json({ error: "Employee not found" }); return; }
  res.json({ ...emp, departmentName: null });
});

export default router;
