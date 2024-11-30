import { Router } from "express";
import { paymentController } from "../config/container";

const router = Router();

router.post('/',paymentController.handleWebhook);

export default router;
