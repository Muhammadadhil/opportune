import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

router.get("/refreshToken", authController.refreshAccessToken);

export default router;
