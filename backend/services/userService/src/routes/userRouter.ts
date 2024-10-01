import { Router } from "express";
import { UserController } from "../controllers/userController";
import { refreshAccessToken, getGoogleAuthToken, getGoogleUserInfo } from "../controllers/authController";
import { OtpController } from "../controllers/OtpController";

const router = Router();
const userController = new UserController();
const otpController= new OtpController();
// const authController = new AuthController();

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

router.get("/refreshToken", refreshAccessToken);

//google sign in
router.post("/google-login", getGoogleUserInfo);
// router.post("/auth/google", getGoogleAuthToken);

//otp
router.post("/otp-verify", otpController.verifyOtp);
router.post("/otp-resend", otpController.resendOtp);

export default router;
