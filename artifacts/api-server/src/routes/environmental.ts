import { Router, type IRouter } from "express";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import { db, emissionFactorsTable, carbonTransactionsTable, environmentalGoalsTable, departmentsTable } from "@workspace/db";
import {
  CreateEmissionFactorBody,
  UpdateEmissionFactorBody,
  UpdateEmissionFactorParams,
  DeleteEmissionFactorParams,
  CreateCarbonTransactionBody,
  GetCarbonTransactionParams,
  DeleteCarbonTransactionParams,
  ListCarbonTransactionsQueryParams,
  CreateEnvironmentalGoalBody,
  UpdateEnvironmentalGoalBody,
  UpdateEnvironmentalGoalParams,
  DeleteEnvironmentalGoalParams,
} from "@workspace/api-zod";

const router: IRouter = Router();



router.get("/emission-factors", async (_req, res): Promise<void> => {
  const rows = await db.select().from(emissionFactorsTable).orderBy(emissionFactorsTable.name);
  res.json(rows.map(ef => ({ ...ef, factor: Number(ef.factor) })));
});

router.post("/emission-factors", async (req, res): Promise<void> => {
  const parsed = CreateEmissionFactorBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [ef] = await db.insert(emissionFactorsTable).values({ ...parsed.data, factor: String(parsed.data.factor) }).returning();
  res.status(201).json({ ...ef, factor: Number(ef.factor) });
});

router.patch("/emission-factors/:id", async (req, res): Promise<void> => {
  const params = UpdateEmissionFactorParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateEmissionFactorBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData: any = { ...parsed.data };
  if (updateData.factor !== undefined) updateData.factor = String(updateData.factor);
  const [ef] = await db.update(emissionFactorsTable).set(updateData).where(eq(emissionFactorsTable.id, params.data.id)).returning();
  if (!ef) { res.status(404).json({ error: "Emission factor not found" }); return; }
  res.json({ ...ef, factor: Number(ef.factor) });
});

router.delete("/emission-factors/:id", async (req, res): Promise<void> => {
  const params = DeleteEmissionFactorParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [ef] = await db.delete(emissionFactorsTable).where(eq(emissionFactorsTable.id, params.data.id)).returning();
  if (!ef) { res.status(404).json({ error: "Emission factor not found" }); return; }
  res.sendStatus(204);
});



router.get("/carbon-transactions", async (req, res): Promise<void> => {
  const query = ListCarbonTransactionsQueryParams.safeParse(req.query);
  const conditions: any[] = [];
  if (query.success) {
    if (query.data.departmentId) conditions.push(eq(carbonTransactionsTable.departmentId, query.data.departmentId));
    if (query.data.startDate) {
      const startStr = query.data.startDate instanceof Date ? query.data.startDate.toISOString().split("T")[0] : query.data.startDate;
      conditions.push(gte(carbonTransactionsTable.transactionDate, startStr));
    }
    if (query.data.endDate) {
      const endStr = query.data.endDate instanceof Date ? query.data.endDate.toISOString().split("T")[0] : query.data.endDate;
      conditions.push(lte(carbonTransactionsTable.transactionDate, endStr));
    }
  }

  const rows = await db.execute(sql`
    SELECT ct.*, d.name as department_name, ef.name as emission_factor_name
    FROM carbon_transactions ct
    LEFT JOIN departments d ON ct.department_id = d.id
    LEFT JOIN emission_factors ef ON ct.emission_factor_id = ef.id
    ORDER BY ct.transaction_date DESC
  `);

  let result = rows.rows.map((r: any) => ({
    id: r.id,
    departmentId: r.department_id,
    departmentName: r.department_name,
    emissionFactorId: r.emission_factor_id,
    emissionFactorName: r.emission_factor_name,
    quantity: Number(r.quantity),
    totalEmission: Number(r.total_emission),
    source: r.source,
    description: r.description,
    transactionDate: r.transaction_date,
    createdAt: r.created_at,
  }));

  if (query.success) {
    if (query.data.departmentId) result = result.filter(r => r.departmentId === query.data.departmentId);
    if (query.data.startDate) result = result.filter(r => r.transactionDate >= query.data.startDate!);
    if (query.data.endDate) result = result.filter(r => r.transactionDate <= query.data.endDate!);
  }

  res.json(result);
});

router.post("/carbon-transactions", async (req, res): Promise<void> => {
  const parsed = CreateCarbonTransactionBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const [ef] = await db.select().from(emissionFactorsTable).where(eq(emissionFactorsTable.id, parsed.data.emissionFactorId));
  if (!ef) { res.status(400).json({ error: "Emission factor not found" }); return; }

  const totalEmission = parsed.data.quantity * Number(ef.factor);
  const values = {
    ...parsed.data,
    quantity: String(parsed.data.quantity),
    totalEmission: String(totalEmission),
  } as any;
  if (values.transactionDate instanceof Date) values.transactionDate = values.transactionDate.toISOString().split("T")[0];
  const [ct] = await db.insert(carbonTransactionsTable).values(values).returning();

  res.status(201).json({
    ...ct,
    quantity: Number(ct.quantity),
    totalEmission: Number(ct.totalEmission),
    departmentName: null,
    emissionFactorName: ef.name,
  });
});

router.get("/carbon-transactions/:id", async (req, res): Promise<void> => {
  const params = GetCarbonTransactionParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT ct.*, d.name as department_name, ef.name as emission_factor_name
    FROM carbon_transactions ct
    LEFT JOIN departments d ON ct.department_id = d.id
    LEFT JOIN emission_factors ef ON ct.emission_factor_id = ef.id
    WHERE ct.id = ${params.data.id}
  `);
  const r = rows.rows[0] as any;
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...r, quantity: Number(r.quantity), totalEmission: Number(r.total_emission), departmentId: r.department_id, departmentName: r.department_name, emissionFactorId: r.emission_factor_id, emissionFactorName: r.emission_factor_name, transactionDate: r.transaction_date, createdAt: r.created_at });
});

router.delete("/carbon-transactions/:id", async (req, res): Promise<void> => {
  const params = DeleteCarbonTransactionParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [ct] = await db.delete(carbonTransactionsTable).where(eq(carbonTransactionsTable.id, params.data.id)).returning();
  if (!ct) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});


router.get("/environmental-goals", async (_req, res): Promise<void> => {
  const rows = await db.execute(sql`
    SELECT eg.*, d.name as department_name
    FROM environmental_goals eg
    LEFT JOIN departments d ON eg.department_id = d.id
    ORDER BY eg.deadline
  `);
  res.json(rows.rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    departmentId: r.department_id,
    departmentName: r.department_name,
    targetValue: Number(r.target_value),
    currentValue: Number(r.current_value),
    unit: r.unit,
    deadline: r.deadline,
    status: r.status,
    progressPercent: r.target_value > 0 ? Math.min(Math.round((Number(r.current_value) / Number(r.target_value)) * 100), 100) : 0,
  })));
});

router.post("/environmental-goals", async (req, res): Promise<void> => {
  const parsed = CreateEnvironmentalGoalBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = {
    ...parsed.data,
    targetValue: String(parsed.data.targetValue),
    currentValue: String(parsed.data.currentValue ?? 0),
  } as any;
  if (values.deadline instanceof Date) values.deadline = values.deadline.toISOString().split("T")[0];
  const [goal] = await db.insert(environmentalGoalsTable).values(values).returning();
  res.status(201).json({
    ...goal,
    targetValue: Number(goal.targetValue),
    currentValue: Number(goal.currentValue),
    progressPercent: 0,
    departmentName: null,
  });
});

router.patch("/environmental-goals/:id", async (req, res): Promise<void> => {
  const params = UpdateEnvironmentalGoalParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateEnvironmentalGoalBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData: any = { ...parsed.data };
  if (updateData.targetValue !== undefined) updateData.targetValue = String(updateData.targetValue);
  if (updateData.currentValue !== undefined) updateData.currentValue = String(updateData.currentValue);
  if (updateData.deadline instanceof Date) updateData.deadline = updateData.deadline.toISOString().split("T")[0];
  const [goal] = await db.update(environmentalGoalsTable).set(updateData).where(eq(environmentalGoalsTable.id, params.data.id)).returning();
  if (!goal) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...goal, targetValue: Number(goal.targetValue), currentValue: Number(goal.currentValue), progressPercent: 0, departmentName: null });
});

router.delete("/environmental-goals/:id", async (req, res): Promise<void> => {
  const params = DeleteEnvironmentalGoalParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [goal] = await db.delete(environmentalGoalsTable).where(eq(environmentalGoalsTable.id, params.data.id)).returning();
  if (!goal) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

export default router;
