import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dataRouter from "./data";
import uploadRouter from "./upload";
import translateRouter from "./translate";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dataRouter);
router.use(uploadRouter);
router.use(translateRouter);

export default router;
