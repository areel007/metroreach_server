import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { adminAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/auth", new AdminController().login);
router.get("/download", adminAuth, new AdminController().downloadForm);

export default router;
