"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserConsumer = void 0;
const rabbitmq_connection_1 = require("../../../config/rabbitmq.connection");
const inversify_1 = require("inversify");
const types_1 = require("../../../types/types");
let UserConsumer = class UserConsumer {
    constructor(userService) {
        this.channel = null;
        this.exchangeName = "user_exchange";
        this.userService = userService;
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
                            console.log('consuming from the exchange:', this.exchangeName);
                            console.log("consuming message:", messageContent);
                            this.userService.handleEvent(messageContent.eventType, messageContent);
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
};
exports.UserConsumer = UserConsumer;
exports.UserConsumer = UserConsumer = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserService)),
    __metadata("design:paramtypes", [Object])
], UserConsumer);
