import { Router } from "express";
import { paymentController } from "../config/container";

const router = Router();

// router.post("/payment-intents", paymentController.createPaymentIntent);

router.post("/create/checkout-session", paymentController.createCheckoutSession.bind(paymentController));

// release payment
router.post("/release", paymentController.handleReleasePayment);

export default router;
