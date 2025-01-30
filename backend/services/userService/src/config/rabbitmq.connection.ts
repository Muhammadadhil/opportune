import { RabbitMQConnection } from "@_opportune/common";

const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";

console.log("RabbitMQ URL: ", rabbitMQUrl); 

export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl);