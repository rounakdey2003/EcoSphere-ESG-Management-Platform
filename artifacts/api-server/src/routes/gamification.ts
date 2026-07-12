import { Router, type IRouter } from "express";
import { eq, sql, desc } from "drizzle-orm";
import {
  db, challengesTable, challengeParticipationsTable, badgesTable,
  employeeBadgesTable, rewardsTable, rewardRedemptionsTable, employeesTable,
} from "@workspace/db";
import {
  CreateChallengeBody,
  UpdateChallengeBody,
  UpdateChallengeParams,
  DeleteChallengeParams,
  GetChallengeParams,
  ListChallengesQueryParams,
  CreateChallengeParticipationBody,
  UpdateChallengeParticipationBody,
  UpdateChallengeParticipationParams,
  ListChallengeParticipationsQueryParams,
  CreateBadgeBody,
  UpdateBadgeBody,
  UpdateBadgeParams,
  DeleteBadgeParams,
  ListEmployeeBadgesQueryParams,
  AwardBadgeBody,
  CreateRewardBody,
  UpdateRewardBody,
  UpdateRewardParams,
  DeleteRewardParams,
  ListRewardRedemptionsQueryParams,
  RedeemRewardBody,
  GetLeaderboardQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();



router.get("/challenges", async (req, res): Promise<void> => {
  const query = ListChallengesQueryParams.safeParse(req.query);
  const rows = await db.execute(sql`
    SELECT c.*, cat.name as category_name, COUNT(cp.id)::int as participant_count
    FROM challenges c
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN challenge_participations cp ON cp.challenge_id = c.id
    GROUP BY c.id, cat.name
    ORDER BY c.created_at DESC
  `);
  let result = rows.rows.map((r: any) => ({
    id: r.id, title: r.title, description: r.description,
    categoryId: r.category_id, categoryName: r.category_name,
    xp: r.xp, difficulty: r.difficulty, evidenceRequired: r.evidence_required,
    deadline: r.deadline, status: r.status,
    participantCount: Number(r.participant_count), createdAt: r.created_at,
  }));
  if (query.success) {
    if (query.data.status) result = result.filter(r => r.status === query.data.status);
    if (query.data.categoryId) result = result.filter(r => r.categoryId === query.data.categoryId);
  }
  res.json(result);
});

router.post("/challenges", async (req, res): Promise<void> => {
  const parsed = CreateChallengeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const values = { ...parsed.data } as any;
  if (values.deadline instanceof Date) values.deadline = values.deadline.toISOString().split("T")[0];
  const [ch] = await db.insert(challengesTable).values(values).returning();
  res.status(201).json({ ...ch, categoryName: null, participantCount: 0 });
});

router.get("/challenges/:id", async (req, res): Promise<void> => {
  const params = GetChallengeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const rows = await db.execute(sql`
    SELECT c.*, cat.name as category_name, COUNT(cp.id)::int as participant_count
    FROM challenges c
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN challenge_participations cp ON cp.challenge_id = c.id
    WHERE c.id = ${params.data.id}
    GROUP BY c.id, cat.name
  `);
  const r = rows.rows[0] as any;
  if (!r) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ id: r.id, title: r.title, description: r.description, categoryId: r.category_id, categoryName: r.category_name, xp: r.xp, difficulty: r.difficulty, evidenceRequired: r.evidence_required, deadline: r.deadline, status: r.status, participantCount: Number(r.participant_count), createdAt: r.created_at });
});

router.patch("/challenges/:id", async (req, res): Promise<void> => {
  const params = UpdateChallengeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateChallengeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData = { ...parsed.data } as any;
  if (updateData.deadline instanceof Date) updateData.deadline = updateData.deadline.toISOString().split("T")[0];
  const [ch] = await db.update(challengesTable).set(updateData).where(eq(challengesTable.id, params.data.id)).returning();
  if (!ch) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...ch, categoryName: null, participantCount: 0 });
});

router.delete("/challenges/:id", async (req, res): Promise<void> => {
  const params = DeleteChallengeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [ch] = await db.delete(challengesTable).where(eq(challengesTable.id, params.data.id)).returning();
  if (!ch) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});


router.get("/challenge-participations", async (req, res): Promise<void> => {
  const query = ListChallengeParticipationsQueryParams.safeParse(req.query);
  const rows = await db.execute(sql`
    SELECT cp.*, c.title as challenge_title, e.name as employee_name
    FROM challenge_participations cp
    LEFT JOIN challenges c ON cp.challenge_id = c.id
    LEFT JOIN employees e ON cp.employee_id = e.id
    ORDER BY cp.submitted_at DESC
  `);
  let result = rows.rows.map((r: any) => ({
    id: r.id, challengeId: r.challenge_id, challengeTitle: r.challenge_title,
    employeeId: r.employee_id, employeeName: r.employee_name,
    progress: r.progress, proof: r.proof, approvalStatus: r.approval_status,
    xpAwarded: r.xp_awarded, submittedAt: r.submitted_at,
  }));
  if (query.success) {
    if (query.data.challengeId) result = result.filter(r => r.challengeId === query.data.challengeId);
    if (query.data.employeeId) result = result.filter(r => r.employeeId === query.data.employeeId);
  }
  res.json(result);
});

router.post("/challenge-participations", async (req, res): Promise<void> => {
  const parsed = CreateChallengeParticipationBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [cp] = await db.insert(challengeParticipationsTable).values(parsed.data).returning();
  res.status(201).json({ ...cp, challengeTitle: null, employeeName: null });
});

router.patch("/challenge-participations/:id", async (req, res): Promise<void> => {
  const params = UpdateChallengeParticipationParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateChallengeParticipationBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const updateData: any = { ...parsed.data };

  if (updateData.approvalStatus === "approved") {
    const [cp] = await db.select().from(challengeParticipationsTable).where(eq(challengeParticipationsTable.id, params.data.id));
    if (cp) {
      const [challenge] = await db.select().from(challengesTable).where(eq(challengesTable.id, cp.challengeId));
      if (challenge && !updateData.xpAwarded) {
        updateData.xpAwarded = challenge.xp;
        await db.execute(sql`UPDATE employees SET xp = xp + ${challenge.xp} WHERE id = ${cp.employeeId}`);
      }
    }
  }

  const [cp] = await db.update(challengeParticipationsTable).set(updateData).where(eq(challengeParticipationsTable.id, params.data.id)).returning();
  if (!cp) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...cp, challengeTitle: null, employeeName: null });
});


router.get("/badges", async (_req, res): Promise<void> => {
  const rows = await db.select().from(badgesTable).orderBy(badgesTable.unlockValue);
  res.json(rows);
});

router.post("/badges", async (req, res): Promise<void> => {
  const parsed = CreateBadgeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [badge] = await db.insert(badgesTable).values(parsed.data).returning();
  res.status(201).json(badge);
});

router.patch("/badges/:id", async (req, res): Promise<void> => {
  const params = UpdateBadgeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateBadgeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [badge] = await db.update(badgesTable).set(parsed.data).where(eq(badgesTable.id, params.data.id)).returning();
  if (!badge) { res.status(404).json({ error: "Not found" }); return; }
  res.json(badge);
});

router.delete("/badges/:id", async (req, res): Promise<void> => {
  const params = DeleteBadgeParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [badge] = await db.delete(badgesTable).where(eq(badgesTable.id, params.data.id)).returning();
  if (!badge) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});


router.get("/employee-badges", async (req, res): Promise<void> => {
  const query = ListEmployeeBadgesQueryParams.safeParse(req.query);
  const rows = await db.execute(sql`
    SELECT eb.*, e.name as employee_name, b.name as badge_name, b.icon as badge_icon
    FROM employee_badges eb
    LEFT JOIN employees e ON eb.employee_id = e.id
    LEFT JOIN badges b ON eb.badge_id = b.id
    ORDER BY eb.awarded_at DESC
  `);
  let result = rows.rows.map((r: any) => ({
    id: r.id, employeeId: r.employee_id, employeeName: r.employee_name,
    badgeId: r.badge_id, badgeName: r.badge_name, badgeIcon: r.badge_icon,
    awardedAt: r.awarded_at,
  }));
  if (query.success && query.data.employeeId) {
    result = result.filter(r => r.employeeId === query.data.employeeId);
  }
  res.json(result);
});

router.post("/employee-badges", async (req, res): Promise<void> => {
  const parsed = AwardBadgeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [eb] = await db.insert(employeeBadgesTable).values(parsed.data).returning();
  res.status(201).json({ ...eb, employeeName: null, badgeName: null, badgeIcon: null });
});


router.get("/rewards", async (_req, res): Promise<void> => {
  const rows = await db.execute(sql`
    SELECT r.*, COUNT(rr.id)::int as redemption_count
    FROM rewards r
    LEFT JOIN reward_redemptions rr ON rr.reward_id = r.id
    GROUP BY r.id
    ORDER BY r.points_required
  `);
  res.json(rows.rows.map((r: any) => ({
    id: r.id, name: r.name, description: r.description,
    pointsRequired: r.points_required, stock: r.stock, status: r.status,
    redemptionCount: Number(r.redemption_count),
  })));
});

router.post("/rewards", async (req, res): Promise<void> => {
  const parsed = CreateRewardBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [reward] = await db.insert(rewardsTable).values(parsed.data).returning();
  res.status(201).json({ ...reward, redemptionCount: 0 });
});

router.patch("/rewards/:id", async (req, res): Promise<void> => {
  const params = UpdateRewardParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const parsed = UpdateRewardBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [reward] = await db.update(rewardsTable).set(parsed.data).where(eq(rewardsTable.id, params.data.id)).returning();
  if (!reward) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...reward, redemptionCount: 0 });
});

router.delete("/rewards/:id", async (req, res): Promise<void> => {
  const params = DeleteRewardParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [reward] = await db.delete(rewardsTable).where(eq(rewardsTable.id, params.data.id)).returning();
  if (!reward) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});


router.get("/reward-redemptions", async (req, res): Promise<void> => {
  const query = ListRewardRedemptionsQueryParams.safeParse(req.query);
  const rows = await db.execute(sql`
    SELECT rr.*, e.name as employee_name, r.name as reward_name
    FROM reward_redemptions rr
    LEFT JOIN employees e ON rr.employee_id = e.id
    LEFT JOIN rewards r ON rr.reward_id = r.id
    ORDER BY rr.redeemed_at DESC
  `);
  let result = rows.rows.map((r: any) => ({
    id: r.id, employeeId: r.employee_id, employeeName: r.employee_name,
    rewardId: r.reward_id, rewardName: r.reward_name,
    pointsSpent: r.points_spent, redeemedAt: r.redeemed_at,
  }));
  if (query.success && query.data.employeeId) {
    result = result.filter(r => r.employeeId === query.data.employeeId);
  }
  res.json(result);
});

router.post("/reward-redemptions", async (req, res): Promise<void> => {
  const parsed = RedeemRewardBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const [reward] = await db.select().from(rewardsTable).where(eq(rewardsTable.id, parsed.data.rewardId));
  if (!reward) { res.status(400).json({ error: "Reward not found" }); return; }
  if (reward.status !== "active") { res.status(400).json({ error: "Reward is not available" }); return; }
  if (reward.stock <= 0) { res.status(400).json({ error: "Reward is out of stock" }); return; }

  const [employee] = await db.select().from(employeesTable).where(eq(employeesTable.id, parsed.data.employeeId));
  if (!employee) { res.status(400).json({ error: "Employee not found" }); return; }
  if (employee.totalPoints < reward.pointsRequired) { res.status(400).json({ error: "Insufficient points" }); return; }

  await db.execute(sql`UPDATE employees SET total_points = total_points - ${reward.pointsRequired} WHERE id = ${parsed.data.employeeId}`);
  await db.execute(sql`UPDATE rewards SET stock = stock - 1 WHERE id = ${parsed.data.rewardId}`);

  const [redemption] = await db.insert(rewardRedemptionsTable).values({
    employeeId: parsed.data.employeeId,
    rewardId: parsed.data.rewardId,
    pointsSpent: reward.pointsRequired,
  }).returning();

  res.status(201).json({ ...redemption, employeeName: employee.name, rewardName: reward.name });
});


router.get("/leaderboard", async (req, res): Promise<void> => {
  const query = GetLeaderboardQueryParams.safeParse(req.query);
  const limit = (query.success && query.data.limit) ? query.data.limit : 20;
  const departmentId = query.success ? query.data.departmentId : undefined;

  const rows = await db.execute(sql`
    SELECT e.id, e.name, e.xp, e.total_points, d.name as department_name,
      COUNT(DISTINCT eb.id)::int as badge_count,
      COUNT(DISTINCT cp.id) FILTER (WHERE cp.approval_status = 'approved')::int as challenge_count
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    LEFT JOIN employee_badges eb ON eb.employee_id = e.id
    LEFT JOIN challenge_participations cp ON cp.employee_id = e.id
    WHERE e.status = 'active'
    GROUP BY e.id, d.name
    ORDER BY e.xp DESC
    LIMIT ${limit}
  `);

  let result = rows.rows.map((r: any, i: number) => ({
    rank: i + 1,
    employeeId: r.id,
    employeeName: r.name,
    departmentName: r.department_name,
    xp: Number(r.xp),
    totalPoints: Number(r.total_points),
    badgeCount: Number(r.badge_count),
    challengeCount: Number(r.challenge_count),
  }));

  if (departmentId) {
    const deptRows = await db.execute(sql`
      SELECT e.id, e.name, e.xp, e.total_points, d.name as department_name,
        COUNT(DISTINCT eb.id)::int as badge_count,
        COUNT(DISTINCT cp.id) FILTER (WHERE cp.approval_status = 'approved')::int as challenge_count
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      LEFT JOIN employee_badges eb ON eb.employee_id = e.id
      LEFT JOIN challenge_participations cp ON cp.employee_id = e.id
      WHERE e.status = 'active' AND e.department_id = ${departmentId}
      GROUP BY e.id, d.name
      ORDER BY e.xp DESC
      LIMIT ${limit}
    `);
    result = deptRows.rows.map((r: any, i: number) => ({
      rank: i + 1, employeeId: r.id, employeeName: r.name, departmentName: r.department_name,
      xp: Number(r.xp), totalPoints: Number(r.total_points),
      badgeCount: Number(r.badge_count), challengeCount: Number(r.challenge_count),
    }));
  }

  res.json(result);
});

export default router;
