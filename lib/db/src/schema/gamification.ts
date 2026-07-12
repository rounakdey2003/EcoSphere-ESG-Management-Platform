import { pgTable, text, serial, timestamp, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const challengesTable = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  categoryId: integer("category_id").notNull(),
  xp: integer("xp").notNull(),
  difficulty: text("difficulty").notNull(), 
  evidenceRequired: boolean("evidence_required").notNull().default(false),
  deadline: date("deadline", { mode: "string" }),
  status: text("status").notNull().default("draft"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertChallengeSchema = createInsertSchema(challengesTable).omit({ id: true, createdAt: true });
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challengesTable.$inferSelect;

export const challengeParticipationsTable = pgTable("challenge_participations", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull(),
  employeeId: integer("employee_id").notNull(),
  progress: integer("progress").notNull().default(0),
  proof: text("proof"),
  approvalStatus: text("approval_status").notNull().default("pending"), 
  xpAwarded: integer("xp_awarded").notNull().default(0),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertChallengeParticipationSchema = createInsertSchema(challengeParticipationsTable).omit({ id: true, submittedAt: true, xpAwarded: true, approvalStatus: true });
export type InsertChallengeParticipation = z.infer<typeof insertChallengeParticipationSchema>;
export type ChallengeParticipation = typeof challengeParticipationsTable.$inferSelect;

export const badgesTable = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  unlockRule: text("unlock_rule").notNull(),
  unlockType: text("unlock_type").notNull(), 
  unlockValue: integer("unlock_value").notNull(),
  icon: text("icon").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBadgeSchema = createInsertSchema(badgesTable).omit({ id: true, createdAt: true });
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badgesTable.$inferSelect;

export const employeeBadgesTable = pgTable("employee_badges", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  awardedAt: timestamp("awarded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEmployeeBadgeSchema = createInsertSchema(employeeBadgesTable).omit({ id: true, awardedAt: true });
export type InsertEmployeeBadge = z.infer<typeof insertEmployeeBadgeSchema>;
export type EmployeeBadge = typeof employeeBadgesTable.$inferSelect;

export const rewardsTable = pgTable("rewards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pointsRequired: integer("points_required").notNull(),
  stock: integer("stock").notNull().default(0),
  status: text("status").notNull().default("active"), 
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRewardSchema = createInsertSchema(rewardsTable).omit({ id: true, createdAt: true });
export type InsertReward = z.infer<typeof insertRewardSchema>;
export type Reward = typeof rewardsTable.$inferSelect;

export const rewardRedemptionsTable = pgTable("reward_redemptions", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  rewardId: integer("reward_id").notNull(),
  pointsSpent: integer("points_spent").notNull(),
  redeemedAt: timestamp("redeemed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRewardRedemptionSchema = createInsertSchema(rewardRedemptionsTable).omit({ id: true, redeemedAt: true, pointsSpent: true });
export type InsertRewardRedemption = z.infer<typeof insertRewardRedemptionSchema>;
export type RewardRedemption = typeof rewardRedemptionsTable.$inferSelect;
