import { RabbitMQConnection } from "@_opportune/common";
import dotenv from "dotenv";
dotenv.config();


const rabbitMQUrl = process.env.RABBITMQ_CONNECTION_URL || '';

console.log("rabbitmq connection url ----------------", process.env.RABBITMQ_CONNECTION_URL);


export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl);