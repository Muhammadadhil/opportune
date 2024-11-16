import amqplib from "amqplib";
import { rabbitMQConnection } from "./RabbitMQConnection";

export class RabbitMQProducer {
    private channel: amqplib.Channel | null = null;

    async connect() {
        if (!this.channel) {
            console.log("Creating channel for Job and Gig Service...");
            this.channel = await rabbitMQConnection.createChannel();
            console.log("Channel created:", this.channel);
        }
    }

    async publish(queue: string, message: any) {
        console.log(`Message Going to sent to queue ${queue}: ${message}`);
        if (!this.channel) {
            throw new Error("RabbitMQ channel is not initialized");
        }

        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(`Message sent to queue ${queue}: ${message}`);
    }
}
