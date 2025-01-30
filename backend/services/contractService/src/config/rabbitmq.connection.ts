import { RabbitMQConnection } from "@_opportune/common";

const rabbitMQUrl =  process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";

export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl); 