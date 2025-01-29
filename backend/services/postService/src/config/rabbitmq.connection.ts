import { RabbitMQConnection } from "@_opportune/common";

const rabbitMQUrl = "amqp://rabbitmq:5672";

export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl);