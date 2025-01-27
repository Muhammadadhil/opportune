import { RabbitMQConnection } from "@_opportune/common";

const rabbitMQUrl = "amqp://localhost:5672";

export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl);