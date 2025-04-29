import { RabbitMQConnection } from "@_opportune/common";


const rabbitMQUrl = process.env.RABBITMQ_CONNECTION_URL || '';

console.log(process.env.RABBITMQ_CONNECTION_URL+'rabbitmq connection url::::::::::::::::::::::::::::::::::::::::')

export const rabbitMQInstance = RabbitMQConnection.getInstance(rabbitMQUrl);