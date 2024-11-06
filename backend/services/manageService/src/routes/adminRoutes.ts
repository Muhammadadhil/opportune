import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const adminController = new AdminController();

router.post("/login",adminController.login);
router.patch("/logout",adminController.logout);



export default router;
