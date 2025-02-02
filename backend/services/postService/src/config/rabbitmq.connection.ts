import { RabbitMQConnection } from "@_opportune/common";

const rabbitMQUrl = process.env.RABBITMQ_CONNECTION_URL || '';

export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl);