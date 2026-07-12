import { Router, type IRouter } from "express";
import healthRouter from "./health";
import departmentsRouter from "./departments";
import categoriesRouter from "./categories";
import employeesRouter from "./employees";
import environmentalRouter from "./environmental";
import socialRouter from "./social";
import governanceRouter from "./governance";
import gamificationRouter from "./gamification";
import dashboardRouter from "./dashboard";
import reportsRouter from "./reports";
import settingsRouter from "./settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(departmentsRouter);
router.use(categoriesRouter);
router.use(employeesRouter);
router.use(environmentalRouter);
router.use(socialRouter);
router.use(governanceRouter);
router.use(gamificationRouter);
router.use(dashboardRouter);
router.use(reportsRouter);
router.use(settingsRouter);

export default router;
