import { pgTable, text, serial, timestamp, integer, numeric, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const emissionFactorsTable = pgTable("emission_factors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), 
  factor: numeric("factor", { precision: 15, scale: 6 }).notNull(),
  unit: text("unit").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEmissionFactorSchema = createInsertSchema(emissionFactorsTable).omit({ id: true, createdAt: true });
export type InsertEmissionFactor = z.infer<typeof insertEmissionFactorSchema>;
export type EmissionFactor = typeof emissionFactorsTable.$inferSelect;

export const carbonTransactionsTable = pgTable("carbon_transactions", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id").notNull(),
  emissionFactorId: integer("emission_factor_id").notNull(),
  quantity: numeric("quantity", { precision: 15, scale: 4 }).notNull(),
  totalEmission: numeric("total_emission", { precision: 15, scale: 4 }).notNull(),
  source: text("source").notNull(), 
  description: text("description"),
  transactionDate: date("transaction_date", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCarbonTransactionSchema = createInsertSchema(carbonTransactionsTable).omit({ id: true, createdAt: true, totalEmission: true });
export type InsertCarbonTransaction = z.infer<typeof insertCarbonTransactionSchema>;
export type CarbonTransaction = typeof carbonTransactionsTable.$inferSelect;

export const environmentalGoalsTable = pgTable("environmental_goals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  departmentId: integer("department_id"),
  targetValue: numeric("target_value", { precision: 15, scale: 4 }).notNull(),
  currentValue: numeric("current_value", { precision: 15, scale: 4 }).notNull().default("0"),
  unit: text("unit").notNull(),
  deadline: date("deadline", { mode: "string" }).notNull(),
  status: text("status").notNull().default("active"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEnvironmentalGoalSchema = createInsertSchema(environmentalGoalsTable).omit({ id: true, createdAt: true });
export type InsertEnvironmentalGoal = z.infer<typeof insertEnvironmentalGoalSchema>;
export type EnvironmentalGoal = typeof environmentalGoalsTable.$inferSelect;
