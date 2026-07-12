import { pgTable, text, serial, timestamp, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const csrActivitiesTable = pgTable("csr_activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: integer("category_id").notNull(),
  departmentId: integer("department_id"),
  points: integer("points").notNull().default(100),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }),
  status: text("status").notNull().default("planned"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCsrActivitySchema = createInsertSchema(csrActivitiesTable).omit({ id: true, createdAt: true });
export type InsertCsrActivity = z.infer<typeof insertCsrActivitySchema>;
export type CsrActivity = typeof csrActivitiesTable.$inferSelect;

export const employeeParticipationsTable = pgTable("employee_participations", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  activityId: integer("activity_id").notNull(),
  proof: text("proof"),
  approvalStatus: text("approval_status").notNull().default("pending"), 
  pointsEarned: integer("points_earned").notNull().default(0),
  completionDate: date("completion_date", { mode: "string" }),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEmployeeParticipationSchema = createInsertSchema(employeeParticipationsTable).omit({ id: true, submittedAt: true, pointsEarned: true, approvalStatus: true });
export type InsertEmployeeParticipation = z.infer<typeof insertEmployeeParticipationSchema>;
export type EmployeeParticipation = typeof employeeParticipationsTable.$inferSelect;
