import { Router } from "express";
import { notificationController } from "../config/container";

const router = Router();

router.post("/create", notificationController.createNotification.bind(notificationController));


export default router;
