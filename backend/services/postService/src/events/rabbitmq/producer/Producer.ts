import amqplib from "amqplib";
import { rabbitMQInstance } from "../../../config/rabbitmq.connection";
import { IRabbitMQProducer } from "./IRabbitMqProducer";

export class RabbitMQProducer implements IRabbitMQProducer {
    private channel: amqplib.Channel | null = null;

    async connect() {
        
        if (!this.channel) {
            console.log("Creating channel for Job and Gig Service...");
            this.channel = await rabbitMQInstance.createChannel();
        }
    }

    async publish(queue: string, message: any) {
        if (!this.channel) {
            throw new Error("RabbitMQ channel is not initialized");
        }

        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(`Message sent to queue ${queue}: ${message}`);
    }

    async publishToMultiple(exchange: string, message: any) {
        if (!this.channel) {
            throw new Error("RabbitMQ channel is not initialized");
        }

        await this.channel.assertExchange(exchange, "fanout", { durable: true });
        this.channel.publish(exchange, "", Buffer.from(JSON.stringify(message)));
        console.log(`Message sent to fanout exchange ${exchange}: ${message}`);
    }
}

