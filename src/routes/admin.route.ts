import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { adminAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/auth", new AdminController().login);
router.route("/auth").post(new AdminController().login);
router.post("/logout", adminAuth, new AdminController().logout);

export default router;
