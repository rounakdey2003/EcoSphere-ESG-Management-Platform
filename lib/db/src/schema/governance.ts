import { pgTable, text, serial, timestamp, integer, date, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const esgPoliciesTable = pgTable("esg_policies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), 
  effectiveDate: date("effective_date", { mode: "string" }).notNull(),
  expiryDate: date("expiry_date", { mode: "string" }),
  status: text("status").notNull().default("draft"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEsgPolicySchema = createInsertSchema(esgPoliciesTable).omit({ id: true, createdAt: true });
export type InsertEsgPolicy = z.infer<typeof insertEsgPolicySchema>;
export type EsgPolicy = typeof esgPoliciesTable.$inferSelect;

export const policyAcknowledgementsTable = pgTable("policy_acknowledgements", {
  id: serial("id").primaryKey(),
  policyId: integer("policy_id").notNull(),
  employeeId: integer("employee_id").notNull(),
  acknowledgedAt: timestamp("acknowledged_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPolicyAcknowledgementSchema = createInsertSchema(policyAcknowledgementsTable).omit({ id: true, acknowledgedAt: true });
export type InsertPolicyAcknowledgement = z.infer<typeof insertPolicyAcknowledgementSchema>;
export type PolicyAcknowledgement = typeof policyAcknowledgementsTable.$inferSelect;

export const auditsTable = pgTable("audits", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  auditor: text("auditor").notNull(),
  departmentId: integer("department_id"),
  auditDate: date("audit_date", { mode: "string" }).notNull(),
  status: text("status").notNull().default("scheduled"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAuditSchema = createInsertSchema(auditsTable).omit({ id: true, createdAt: true });
export type InsertAudit = z.infer<typeof insertAuditSchema>;
export type Audit = typeof auditsTable.$inferSelect;

export const complianceIssuesTable = pgTable("compliance_issues", {
  id: serial("id").primaryKey(),
  auditId: integer("audit_id").notNull(),
  severity: text("severity").notNull(), 
  description: text("description").notNull(),
  ownerId: integer("owner_id").notNull(),
  dueDate: date("due_date", { mode: "string" }).notNull(),
  status: text("status").notNull().default("open"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertComplianceIssueSchema = createInsertSchema(complianceIssuesTable).omit({ id: true, createdAt: true });
export type InsertComplianceIssue = z.infer<typeof insertComplianceIssueSchema>;
export type ComplianceIssue = typeof complianceIssuesTable.$inferSelect;
