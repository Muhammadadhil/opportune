import { Router } from "express";
import { UserController } from "../controllers/userController";
import { refreshAccessToken, getGoogleAuthToken, getGoogleUserInfo } from "../controllers/authController";
import { OtpController } from "../controllers/OtpController";
import protect from "../middleware/protect";
import upload from "../utils/multerConfig";

const router = Router();
const userController = new UserController();
const otpController = new OtpController();

router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.patch("/logout", userController.logout);

router.get("/refreshToken", refreshAccessToken);

//google sign in
router.post("/google-login", getGoogleUserInfo);
// router.post("/auth/google", getGoogleAuthToken);

//otp
router.post("/otp-verify", otpController.verifyOtp);
router.post("/otp-resend", otpController.resendOtp);

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//details
router.post("/save-client-details", userController.saveClientDetails);
router.post("/client-profile", protect, userController.getClientData);

router.post("/complete-profile",protect,upload.single('image'),userController.saveFreelancerDetails);
router.post("/freelancer-profile",protect,userController.getFreelancerData);

export default router;
