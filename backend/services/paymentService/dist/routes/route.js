"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../config/container");
const router = (0, express_1.Router)();
// router.post("/payment-intents", paymentController.createPaymentIntent);
router.post("/create/checkout-session", container_1.paymentController.createCheckoutSession.bind(container_1.paymentController));
// release payment
router.post("/release", container_1.paymentController.handleReleasePayment);
router.get("/payments", container_1.paymentController.getAllPayments);
router.get('/escrow/paymensts', container_1.paymentController.getEscrowPayments);
exports.default = router;
