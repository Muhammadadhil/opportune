import amqplib from "amqplib";
import { rabbitMQConnection } from "./RabbitMQConnection";

export class RabbitMQProducer {
    private channel: amqplib.Channel | null = null;

    async connect() {
        if (!this.channel) {
            this.channel = await rabbitMQConnection.createChannel();
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
}
