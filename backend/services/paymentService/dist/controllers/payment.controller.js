"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const stripe_1 = __importDefault(require("stripe"));
class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this._paymentService = paymentService;
        this.handleReleasePayment = this.handleReleasePayment.bind(this);
        this.getAllPayments = this.getAllPayments.bind(this);
        this.getEscrowPayments = this.getEscrowPayments.bind(this);
    }
    createCheckoutSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { milestoneAmount, contractId, freelancerId, clientId, milestoneId } = req.body;
                console.log("creating checkout session:", milestoneAmount, contractId, freelancerId, clientId, milestoneId);
                const sessionId = yield this._paymentService.createSession(milestoneId, milestoneAmount, contractId, freelancerId, clientId);
                if (sessionId) {
                    res.status(201).json(sessionId);
                }
                else {
                    res.status(409).json({ error: "One payment already exists for this milestone" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleWebhook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signature = req.headers["stripe-signature"];
                console.log("signature handle webhook contrller:", signature);
                if (!signature) {
                    throw new Error("No Stripe Signature found");
                }
                const event = stripe_1.default.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
                this._paymentService.handleStripeWebhook(event);
                res.status(200).end();
            }
            catch (error) {
                console.log("webhook error:", error);
                res.status(400).send(`Webhook Error: ${error}`);
            }
        });
    }
    handleReleasePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("!!!!!!!!!!!!!!!!! releasing payment in payment Service !!!!!!!!!!!!!!1:", req.body);
                const { escrowId } = req.body;
                const paymentIntent = yield this._paymentService.releasePayment(escrowId);
                res.json(paymentIntent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllPayments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield this._paymentService.getAllPayments();
                res.json(payments);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEscrowPayments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield this._paymentService.getEscrowPayments();
                res.json(payments);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PaymentController = PaymentController;
