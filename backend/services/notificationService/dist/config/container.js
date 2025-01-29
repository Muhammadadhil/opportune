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
exports.notificationController = void 0;
exports.intialiseConsumers = intialiseConsumers;
const notification_controller_1 = require("../controllers/notification.controller");
const notification_repository_1 = require("../repositories/implementation/notification.repository");
const notification_services_1 = require("../services/implementation/notification.services");
const notification_schema_1 = __importDefault(require("../schema/notification.schema"));
// const publisher = new Publisher();
// publisher.connect();
//repositories
const notificationRepository = new notification_repository_1.NotificationRepository(notification_schema_1.default);
//services
const notificationService = new notification_services_1.NotificationService(notificationRepository);
//controllers
const notificationController = new notification_controller_1.NotificationController(notificationService);
exports.notificationController = notificationController;
// consumers
// const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");
function intialiseConsumers() {
    return __awaiter(this, void 0, void 0, function* () {
        // offerConsumer.initialise();
    });
}
