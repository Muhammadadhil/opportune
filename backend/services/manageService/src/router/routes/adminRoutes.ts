import { Router } from "express";
import { AdminController } from "../../controllers/implementation/admin.controller";
import container from "../../config/inversify";
import { TYPES } from "../../interfaces/types";
import { IUserController } from "../../controllers/interface/IUserController";
import { adminAuth } from "../../middleware/authenticate";

const router = Router();
const adminController = new AdminController();

const userController = container.get<IUserController>(TYPES.IUserController);

router.post("/login",adminController.login);
router.patch("/logout",adminController.logout);

router.get("/users", adminAuth,userController.getUsers);
router.patch(`/users/:userId/block-toggle`,adminAuth, userController.toggleBlockStatus);


export default router;
