import { Router } from "express";
import { AdminController } from "../../controllers/implementation/admin.controller";
import container from "../../config/inversify";
import { TYPES } from "../../interfaces/types";
import { IUserController } from "../../controllers/interface/IUserController";
import { adminAuth } from "../../middleware/authenticate";
import { IAdminTransactionController } from "../../controllers/interface/IAdminTransactionController";

const router = Router();
const adminController = new AdminController();

const userController = container.get<IUserController>(TYPES.IUserController);
const adminTransactionController = container.get<IAdminTransactionController>(TYPES.IAdminTransactionController);

router.post("/login",adminController.login);
router.patch("/logout",adminController.logout);

router.get("/users", adminAuth,userController.getUsers);
router.patch(`/users/:userId/block-toggle`,adminAuth, userController.toggleBlockStatus);

router.post("/record/commission", adminTransactionController.recordTransaction);



export default router;
