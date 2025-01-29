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
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const PaymentStatus_1 = require("../../enums/PaymentStatus");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const EscrowStatus_1 = require("../../enums/EscrowStatus");
const common_1 = require("@_opportune/common");
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
class PaymentService {
    constructor(paymentRepository, escrowRepository, publisher) {
        this.paymentRepository = paymentRepository;
        this.escrowRepository = escrowRepository;
        this.publisher = publisher;
        this._paymentRepository = paymentRepository;
        this._escrowRepository = escrowRepository;
        this._publisher = publisher;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    createSession(milestoneId, milestoneAmount, contractId, freelancerId, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("milestoneId:", milestoneAmount);
            const amount = Number(Number(milestoneAmount).toFixed(2));
            const paymentExist = yield this._paymentRepository.findOne({ milestoneId });
            if (paymentExist) {
                return null;
            }
            const session = yield this.stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: `Milestone Payment for Contract ${contractId}`,
                            },
                            unit_amount: amount * 100, // Amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.FRONTEND_URL}/payment-success`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
                metadata: {
                    milestoneId,
                    milestoneAmount: amount,
                    contractId,
                    freelancerId,
                    clientId,
                },
            });
            return session.id;
        });
    }
    handleStripeWebhook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (event.type) {
                case "checkout.session.completed":
                    const session = event.data.object;
                    this.handleSuccessPayment(session);
                    break;
                case "checkout.session.async_payment_failed":
                    // await this.handleFailedPayment(event.data.object);
                    break;
                    throw new common_1.CustomError("Error in releasing payment", 500);
            }
        });
    }
    handleSuccessPayment(session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("session: event.data.object :", session);
                const payment = yield this.savePayment(session);
                const escrow = yield this.createEscrow(payment);
                const paymentObject = payment.toObject();
                const paymentAndEscrowInfo = Object.assign(Object.assign({}, paymentObject), { escrowId: escrow._id, escrowStatus: escrow.status });
                console.log('payment and escrow info:', paymentAndEscrowInfo);
                yield this._paymentRepository.update(payment._id, { escrowId: escrow._id });
                this._publisher.publish("payment_success_exchange", paymentAndEscrowInfo);
            }
            catch (error) {
                throw new common_1.CustomError("Error in handling successful payment", 500);
            }
        });
    }
    savePayment(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { milestoneId, milestoneAmount, contractId, freelancerId, clientId } = session.metadata;
            const paymentData = {
                contractId: new mongoose_1.Types.ObjectId(contractId),
                milestoneId: new mongoose_1.Types.ObjectId(milestoneId),
                clientId: new mongoose_1.Types.ObjectId(clientId),
                freelancerId: new mongoose_1.Types.ObjectId(freelancerId),
                amount: Number(milestoneAmount),
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent,
            };
            const data = Object.assign(Object.assign({}, paymentData), { status: PaymentStatus_1.PaymentStatus.SUCCEEDED });
            const payment = yield this._paymentRepository.create(data);
            return payment;
        });
    }
    createEscrow(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const escrowData = {
                contractId: payment.contractId,
                milestoneId: payment.milestoneId,
                clientId: payment.clientId,
                freelancerId: payment.freelancerId,
                amount: payment.amount,
                paymentId: payment._id,
                status: EscrowStatus_1.EscrowStatus.HOLDING,
            };
            if (!escrowData.contractId || !escrowData.milestoneId || !escrowData.clientId || !escrowData.freelancerId || !escrowData.amount || !escrowData.paymentId) {
                throw new Error("Missing required escrow data fields");
            }
            const escrow = yield this._escrowRepository.create(escrowData);
            return escrow;
        });
    }
    releasePayment(escrowId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("releasing payment in payment service layerrrrrr:", escrowId);
                const escrow = yield this._escrowRepository.findOne({ _id: escrowId });
                console.log("escrow :", escrow);
                if (!escrow) {
                    console.log("escrow not found: throwing error", escrow);
                    throw new common_1.CustomError("Escrow not found", 404);
                }
                if (escrow.status !== EscrowStatus_1.EscrowStatus.HOLDING) {
                    throw new common_1.CustomError("Escrow is not in holding status", 400);
                }
                const commissionRate = 0.1;
                const commissionAmount = escrow.amount * commissionRate;
                const freelancerAmount = escrow.amount - commissionAmount;
                console.log('commisions:', commissionRate, commissionAmount, freelancerAmount);
                // update the commison and frelancer amount in escrow
                const updatedEscrow = yield this._escrowRepository.update(escrowId, {
                    status: EscrowStatus_1.EscrowStatus.RELEASED,
                    commission: commissionAmount,
                    freelancerAmount: freelancerAmount,
                });
                // record the commision of the admin in managee service
                console.log("!!!! record the commision of the admin in managee service !!!!");
                yield axios_1.default.post(`http://localhost:3010/record/commission`, { commissionAmount, updatedEscrow });
                // add freeelacer amount to user wallet
                //adCh1
                yield axios_1.default.post(`http://localhost:3015/wallet/update/${updatedEscrow === null || updatedEscrow === void 0 ? void 0 : updatedEscrow.freelancerId}`, Object.assign(Object.assign({}, updatedEscrow), { amount: freelancerAmount }));
                return escrow;
            }
            catch (error) {
                console.log('payment service layer error:', error);
                return null;
            }
        });
    }
    getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._paymentRepository.find();
        });
    }
    getEscrowPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._escrowRepository.getAllHoldingEscrows();
        });
    }
}
exports.PaymentService = PaymentService;
