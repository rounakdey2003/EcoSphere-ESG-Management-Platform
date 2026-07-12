import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, esgPoliciesTable, policyAcknowledgementsTable, auditsTable, complianceIssuesTable, employeesTable } from "@workspace/db";
import {
  CreateEsgPolicyBody,
  UpdateEsgPolicyBody,
  UpdateEsgPolicyParams,
  DeleteEsgPolicyParams,
  GetEsgPolicyParams,
  CreatePolicyAcknowledgementBody,
  ListPolicyAcknowledgementsQueryParams,
  CreateAuditBody,
  UpdateAuditBody,
  UpdateAuditParams,
  GetAuditParams,
  CreateComplianceIssueBody,
  UpdateComplianceIssueBody,
  UpdateComplianceIssueParams,
  GetComplianceIssueParams,
  ListComplianceIssuesQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();



router.get("/esg-policies", async (_req, res): Promise<void> => {
  const rows = await db.execute(sql`
    SELECT ep.*,
      COUNT(pa.id)::int as acknowledgement_count,
      (SELECT COUNT(*) FROM employees WHERE status = 'active') as total_employees
    FROM esg_policies ep
    LEFT JOIN policy_acknowledgements pa ON pa.policy_id = ep.id
    GROUP BY ep.id
    ORDER BY ep.effective_date DESC
  `);
  res.json(rows.rows.map((r: any) => ({
    id: r.id, title: r.title, description: r.description, category: r.category,
    effectiveDate: r.effective_date, expiryDate: r.expiry_date, status: r.status,
    acknowledgementCount: Number(r.acknowledgement_count),
    totalEmployees: Number(r.total_employees),
  })));
});

router.post("/esg-policies", async (req, res): Promise<void> => {
  const parsed = CreateEsgPolicyBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.effectiveDate instanceof Date) values.effectiveDate = values.effectiveDate.toISOString().split("T")[0];
  if (values.expiryDate instanceof Date) values.expiryDate = values.expiryDate.toISOString().split("T")[0];
  const [pol] = await db.insert(esgPoliciesTable).values(values).returning();
  res.status(201).json({ ...pol, acknowledgementCount: 0, totalEmployees: 0 });
});

router.get("/esg-policies/:id", async (req, res): Promise<void> => {
  const params = GetEsgPolicyParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT ep.*, COUNT(pa.id)::int as acknowledgement_count,
      (SELECT COUNT(*) FROM employees WHERE status = 'active') as total_employees
    FROM esg_policies ep
    LEFT JOIN policy_acknowledgements pa ON pa.policy_id = ep.id
    WHERE ep.id = ${params.data.id}
    GROUP BY ep.id
  `);
  const r = rows.rows[0] as any;
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ id: r.id, title: r.title, description: r.description, category: r.category, effectiveDate: r.effective_date, expiryDate: r.expiry_date, status: r.status, acknowledgementCount: Number(r.acknowledgement_count), totalEmployees: Number(r.total_employees) });
});

router.patch("/esg-policies/:id", async (req, res): Promise<void> => {
  const params = UpdateEsgPolicyParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateEsgPolicyBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData = { ...parsed.data } as any;
  if (updateData.effectiveDate instanceof Date) updateData.effectiveDate = updateData.effectiveDate.toISOString().split("T")[0];
  if (updateData.expiryDate instanceof Date) updateData.expiryDate = updateData.expiryDate.toISOString().split("T")[0];
  const [pol] = await db.update(esgPoliciesTable).set(updateData).where(eq(esgPoliciesTable.id, params.data.id)).returning();
  if (!pol) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...pol, acknowledgementCount: 0, totalEmployees: 0 });
});

router.delete("/esg-policies/:id", async (req, res): Promise<void> => {
  const params = DeleteEsgPolicyParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [pol] = await db.delete(esgPoliciesTable).where(eq(esgPoliciesTable.id, params.data.id)).returning();
  if (!pol) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});


router.get("/policy-acknowledgements", async (req, res): Promise<void> => {
  const query = ListPolicyAcknowledgementsQueryParams.safeParse(req.query);
  const rows = await db.execute(sql`
    SELECT pa.*, ep.title as policy_title, e.name as employee_name
    FROM policy_acknowledgements pa
    LEFT JOIN esg_policies ep ON pa.policy_id = ep.id
    LEFT JOIN employees e ON pa.employee_id = e.id
    ORDER BY pa.acknowledged_at DESC
  `);
  let result = rows.rows.map((r: any) => ({
    id: r.id, policyId: r.policy_id, policyTitle: r.policy_title,
    employeeId: r.employee_id, employeeName: r.employee_name, acknowledgedAt: r.acknowledged_at,
  }));
  if (query.success) {
    if (query.data.policyId) result = result.filter(r => r.policyId === query.data.policyId);
    if (query.data.employeeId) result = result.filter(r => r.employeeId === query.data.employeeId);
  }
  res.json(result);
});

router.post("/policy-acknowledgements", async (req, res): Promise<void> => {
  const parsed = CreatePolicyAcknowledgementBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [ack] = await db.insert(policyAcknowledgementsTable).values(parsed.data).returning();
  res.status(201).json({ ...ack, policyTitle: null, employeeName: null });
});


router.get("/audits", async (_req, res): Promise<void> => {
  const rows = await db.execute(sql`
    SELECT a.*, d.name as department_name, COUNT(ci.id)::int as issue_count
    FROM audits a
    LEFT JOIN departments d ON a.department_id = d.id
    LEFT JOIN compliance_issues ci ON ci.audit_id = a.id
    GROUP BY a.id, d.name
    ORDER BY a.audit_date DESC
  `);
  res.json(rows.rows.map((r: any) => ({
    id: r.id, title: r.title, description: r.description, auditor: r.auditor,
    departmentId: r.department_id, departmentName: r.department_name,
    auditDate: r.audit_date, status: r.status, issueCount: Number(r.issue_count),
  })));
});

router.post("/audits", async (req, res): Promise<void> => {
  const parsed = CreateAuditBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.auditDate instanceof Date) values.auditDate = values.auditDate.toISOString().split("T")[0];
  const [audit] = await db.insert(auditsTable).values(values).returning();
  res.status(201).json({ ...audit, departmentName: null, issueCount: 0 });
});

router.get("/audits/:id", async (req, res): Promise<void> => {
  const params = GetAuditParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT a.*, d.name as department_name, COUNT(ci.id)::int as issue_count
    FROM audits a
    LEFT JOIN departments d ON a.department_id = d.id
    LEFT JOIN compliance_issues ci ON ci.audit_id = a.id
    WHERE a.id = ${params.data.id}
    GROUP BY a.id, d.name
  `);
  const r = rows.rows[0] as any;
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ id: r.id, title: r.title, description: r.description, auditor: r.auditor, departmentId: r.department_id, departmentName: r.department_name, auditDate: r.audit_date, status: r.status, issueCount: Number(r.issue_count) });
});

router.patch("/audits/:id", async (req, res): Promise<void> => {
  const params = UpdateAuditParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateAuditBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData = { ...parsed.data } as any;
  if (updateData.auditDate instanceof Date) updateData.auditDate = updateData.auditDate.toISOString().split("T")[0];
  const [audit] = await db.update(auditsTable).set(updateData).where(eq(auditsTable.id, params.data.id)).returning();
  if (!audit) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...audit, departmentName: null, issueCount: 0 });
});


router.get("/compliance-issues", async (req, res): Promise<void> => {
  const query = ListComplianceIssuesQueryParams.safeParse(req.query);
  const today = new Date().toISOString().split("T")[0];

  const rows = await db.execute(sql`
    SELECT ci.*, a.title as audit_title, e.name as owner_name
    FROM compliance_issues ci
    LEFT JOIN audits a ON ci.audit_id = a.id
    LEFT JOIN employees e ON ci.owner_id = e.id
    ORDER BY ci.created_at DESC
  `);

  let result = rows.rows.map((r: any) => ({
    id: r.id, auditId: r.audit_id, auditTitle: r.audit_title,
    severity: r.severity, description: r.description,
    ownerId: r.owner_id, ownerName: r.owner_name,
    dueDate: r.due_date, status: r.status,
    isOverdue: r.due_date < today && r.status !== 'resolved',
    createdAt: r.created_at,
  }));

  if (query.success) {
    if (query.data.auditId) result = result.filter(r => r.auditId === query.data.auditId);
    if (query.data.status) result = result.filter(r => r.status === query.data.status);
    if (query.data.overdue === true) result = result.filter(r => r.isOverdue);
  }

  res.json(result);
});

router.post("/compliance-issues", async (req, res): Promise<void> => {
  const parsed = CreateComplianceIssueBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.dueDate instanceof Date) values.dueDate = values.dueDate.toISOString().split("T")[0];
  const [issue] = await db.insert(complianceIssuesTable).values(values).returning();
  const today = new Date().toISOString().split("T")[0];
  res.status(201).json({ ...issue, auditTitle: null, ownerName: null, isOverdue: issue.dueDate < today && issue.status !== 'resolved' });
});

router.get("/compliance-issues/:id", async (req, res): Promise<void> => {
  const params = GetComplianceIssueParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT ci.*, a.title as audit_title, e.name as owner_name
    FROM compliance_issues ci
    LEFT JOIN audits a ON ci.audit_id = a.id
    LEFT JOIN employees e ON ci.owner_id = e.id
    WHERE ci.id = ${params.data.id}
  `);
  const r = rows.rows[0] as any;
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  const today = new Date().toISOString().split("T")[0];
  res.json({ id: r.id, auditId: r.audit_id, auditTitle: r.audit_title, severity: r.severity, description: r.description, ownerId: r.owner_id, ownerName: r.owner_name, dueDate: r.due_date, status: r.status, isOverdue: r.due_date < today && r.status !== 'resolved', createdAt: r.created_at });
});

router.patch("/compliance-issues/:id", async (req, res): Promise<void> => {
  const params = UpdateComplianceIssueParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateComplianceIssueBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData = { ...parsed.data } as any;
  if (updateData.dueDate instanceof Date) updateData.dueDate = updateData.dueDate.toISOString().split("T")[0];
  const [issue] = await db.update(complianceIssuesTable).set(updateData).where(eq(complianceIssuesTable.id, params.data.id)).returning();
  if (!issue) { res.status(404).json({ error: "Not found" }); return; }
  const today = new Date().toISOString().split("T")[0];
  res.json({ ...issue, auditTitle: null, ownerName: null, isOverdue: issue.dueDate < today && issue.status !== 'resolved' });
});

export default router;
