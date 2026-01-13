import { Router } from "express";
import formRouter from "./form.route";
import adminRouter from "./admin.route";

const router = Router();

router.use(formRouter);
router.use(adminRouter);

export default router;
