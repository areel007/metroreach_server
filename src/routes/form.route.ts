import { Router } from "express";
import { FormController } from "../controllers/form.controller";

const router = Router();

router.post("/submit", new FormController().submitForm);
router
  .route("/form-data")
  .get(new FormController().getForm)
  .delete(new FormController().deleteForm);

export default router;
