import { Router } from "express";
import { notificationController } from "../config/container";

const router = Router();

router.post("/create", notificationController.createNotification.bind(notificationController));
router.get("/notifications/:id", notificationController.getUserNotifications.bind(notificationController));
router.patch("/notification/read/:id", notificationController.markAsRead.bind(notificationController));


export default router;
