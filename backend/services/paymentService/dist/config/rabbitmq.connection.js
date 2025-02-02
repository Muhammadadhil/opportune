"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQInstance = void 0;
const common_1 = require("@_opportune/common");
const rabbitMQUrl = "amqp://rabbitmq:5672";
exports.rabbitMQInstance = common_1.RabbitMQConnection.getInstance(rabbitMQUrl);
