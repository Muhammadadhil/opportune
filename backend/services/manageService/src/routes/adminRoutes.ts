import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const adminController = new AdminController();

router.post("/login",(req,res)=> {
    adminController.login(req, res);
});

router.patch("/logout", (req, res) => adminController.logout(req, res));

export default router;
