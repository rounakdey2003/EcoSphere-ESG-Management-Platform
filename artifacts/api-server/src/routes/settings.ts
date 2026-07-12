import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, platformSettingsTable, notificationsTable } from "@workspace/db";
import {
  UpdateSettingsBody,
  ListNotificationsQueryParams,
  MarkNotificationReadParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/settings", async (_req, res): Promise<void> => {
  let [settings] = await db.select().from(platformSettingsTable);
  if (!settings) {
    [settings] = await db.insert(platformSettingsTable).values({}).returning();
  }
  res.json({
    ...settings,
    environmentalWeight: Number(settings.environmentalWeight),
    socialWeight: Number(settings.socialWeight),
    governanceWeight: Number(settings.governanceWeight),
  });
});

router.patch("/settings", async (req, res): Promise<void> => {
  const parsed = UpdateSettingsBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const updateData: any = { ...parsed.data };
  if (updateData.environmentalWeight !== undefined) updateData.environmentalWeight = String(updateData.environmentalWeight);
  if (updateData.socialWeight !== undefined) updateData.socialWeight = String(updateData.socialWeight);
  if (updateData.governanceWeight !== undefined) updateData.governanceWeight = String(updateData.governanceWeight);

  let [settings] = await db.select().from(platformSettingsTable);
  if (!settings) {
    [settings] = await db.insert(platformSettingsTable).values({}).returning();
  }

  const [updated] = await db.update(platformSettingsTable).set(updateData).where(eq(platformSettingsTable.id, settings.id)).returning();
  res.json({
    ...updated,
    environmentalWeight: Number(updated.environmentalWeight),
    socialWeight: Number(updated.socialWeight),
    governanceWeight: Number(updated.governanceWeight),
  });
});

router.get("/notifications", async (req, res): Promise<void> => {
  const query = ListNotificationsQueryParams.safeParse(req.query);
  const rows = await db.select().from(notificationsTable).orderBy(sql`created_at DESC`);
  let result = rows;
  if (query.success) {
    if (query.data.employeeId) result = result.filter(n => n.employeeId === query.data.employeeId);
    if (query.data.unread === true) result = result.filter(n => !n.isRead);
  }
  res.json(result);
});

router.post("/notifications/:id/read", async (req, res): Promise<void> => {
  const params = MarkNotificationReadParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
  const [notif] = await db.update(notificationsTable).set({ isRead: true }).where(eq(notificationsTable.id, params.data.id)).returning();
  if (!notif) { res.status(404).json({ error: "Not found" }); return; }
  res.json(notif);
});

export default router;
