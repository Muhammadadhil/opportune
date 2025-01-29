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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOfferConsumer = void 0;
const rabbitmq_connection_1 = require("../../../config/rabbitmq.connection");
class CreateOfferConsumer {
    constructor(notificationService, exchangeName) {
        this.notificationService = notificationService;
        this.exchangeName = exchangeName;
        this.channel = null;
    }
    initialise() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.channel = yield rabbitmq_connection_1.rabbitMQInstance.createChannel();
                yield this.channel.assertExchange(this.exchangeName, "fanout", { durable: true });
                const q = yield this.channel.assertQueue("");
                yield this.channel.bindQueue(q.queue, this.exchangeName, "");
                console.log(`Waiting for messages in queue ${q.queue} from exchange : ${this.exchangeName}`);
                this.channel.consume(q.queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (msg) {
                        try {
                            const messageContent = JSON.parse(msg.content.toString());
                            // await this.notificationService.createNotification(messageContent);
                            (_a = this.channel) === null || _a === void 0 ? void 0 : _a.ack(msg);
                        }
                        catch (error) {
                            console.error(`Error processing message from exchange ${this.exchangeName}:`, error);
                        }
                    }
                }), { noAck: false });
            }
            catch (error) {
                console.error("Error initializing offer consumer:", error);
            }
        });
    }
}
exports.CreateOfferConsumer = CreateOfferConsumer;
