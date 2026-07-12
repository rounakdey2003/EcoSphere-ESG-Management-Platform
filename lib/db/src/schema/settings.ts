import { pgTable, text, serial, timestamp, boolean, numeric, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const platformSettingsTable = pgTable("platform_settings", {
  id: serial("id").primaryKey(),
  autoEmissionCalculation: boolean("auto_emission_calculation").notNull().default(true),
  evidenceRequired: boolean("evidence_required").notNull().default(false),
  badgeAutoAward: boolean("badge_auto_award").notNull().default(true),
  environmentalWeight: numeric("environmental_weight", { precision: 5, scale: 2 }).notNull().default("40"),
  socialWeight: numeric("social_weight", { precision: 5, scale: 2 }).notNull().default("30"),
  governanceWeight: numeric("governance_weight", { precision: 5, scale: 2 }).notNull().default("30"),
  notifyComplianceIssue: boolean("notify_compliance_issue").notNull().default(true),
  notifyCsrApproval: boolean("notify_csr_approval").notNull().default(true),
  notifyChallengeApproval: boolean("notify_challenge_approval").notNull().default(true),
  notifyPolicyReminder: boolean("notify_policy_reminder").notNull().default(true),
  notifyBadgeUnlock: boolean("notify_badge_unlock").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  type: text("type").notNull(), 
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPlatformSettingsSchema = createInsertSchema(platformSettingsTable).omit({ id: true, updatedAt: true });
export type InsertPlatformSettings = z.infer<typeof insertPlatformSettingsSchema>;
export type PlatformSettings = typeof platformSettingsTable.$inferSelect;

export const insertNotificationSchema = createInsertSchema(notificationsTable).omit({ id: true, createdAt: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;
