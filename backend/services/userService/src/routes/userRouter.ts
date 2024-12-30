import { Router } from "express";
import { UserController } from "../controllers/userController";
// import { refreshAccessToken, getGoogleAuthToken, getGoogleUserInfo } from "../controllers/authController";
import { OtpController } from "../controllers/OtpController";
import { AuthController } from "../controllers/authController";
import protect from "../middleware/protect";
import upload from "../utils/multerConfig";

const router = Router();
const userController = new UserController();
const otpController = new OtpController();
const authController = new AuthController();

// auth routes
router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.login);
router.patch("/auth/logout", userController.logout);
router.get("/auth/refreshToken", authController.refreshAccessToken);

// google auth routes
router.post("/auth/google-login", authController.loginGoogleUser);
// router.post("/auth/google", getGoogleAuthToken);

// otp routes
router.post("/auth/otp/verify", otpController.verifyOtp);
router.post("/auth/otp/resend", otpController.resendOtp);

//client routes
router.post("/clients/details", userController.saveClientDetails);
router.post("/clients/profile", protect, userController.getClientData);

//freelancer routes
router.post("/freelancers/complete-profile", protect, upload.single("image"), userController.saveFreelancerDetails);
router.post("/freelancers/profile", protect, userController.getFreelancerData);
router.get('/freelancers',userController.getFreelancers);

//block user
router.patch(`/users/:userId/block-toggle`, userController.toggleBlockStatus);
router.patch("/freelancers/profile/:userId", userController.editUserProfile);

router.post("/average-rating/add/:userId", userController.editUserProfile);

export default router;
