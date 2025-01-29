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
exports.paymentController = void 0;
exports.intialiseConsumers = intialiseConsumers;
const payment_controller_1 = require("../controllers/payment.controller");
const payment_repository_1 = require("../repositories/implementation/payment.repository");
const payment_services_1 = require("../services/implementation/payment.services");
const payment_schema_1 = __importDefault(require("../schema/payment.schema"));
// import { CreateOfferConsumer } from "../events/rabbitmq/consumers/createOfferConsumer";
const Publisher_1 = require("../events/rabbitmq/producers/Publisher");
const escrowRepository_1 = require("../repositories/implementation/escrowRepository");
const publisher = new Publisher_1.Publisher();
publisher.connect();
//repositories
const paymentRepository = new payment_repository_1.PaymentRepository(payment_schema_1.default);
const escrowRepository = new escrowRepository_1.EscrowRepository();
//services
const paymentService = new payment_services_1.PaymentService(paymentRepository, escrowRepository, publisher);
//controllers
const paymentController = new payment_controller_1.PaymentController(paymentService);
exports.paymentController = paymentController;
// consumers
// const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");
function intialiseConsumers() {
    return __awaiter(this, void 0, void 0, function* () {
        // offerConsumer.initialise();
    });
}
