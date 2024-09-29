import { Router } from "express";
import { UserController } from "../controllers/userController";
import { refreshAccessToken, getGoogleAuthToken, googleAuth } from "../controllers/authController";

const router = Router();
const userController = new UserController();
// const authController = new AuthController();

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

router.get("/refreshToken", refreshAccessToken);

//google sign in
router.post("/google-login", googleAuth);
router.post("/auth/google", getGoogleAuthToken);

export default router;
