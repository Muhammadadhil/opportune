import amqplib from "amqplib";
import { rabbitMQInstance } from '../../../config/rabbitmq.connection';

export class Publisher {
    private channel: amqplib.Channel | null = null;

    async connect() {
        if (!this.channel) {
            this.channel = await rabbitMQInstance.createChannel();
        }
    }

    async publish(exchange: string, message: any) {
        if (!this.channel) {
            throw new Error("RabbitMQ channel is not initialized");
        }
        await this.channel.assertExchange(exchange, "fanout", { durable: true });

        this.channel.publish(exchange, "", Buffer.from(JSON.stringify(message)));
        console.log(`Message sent to fanout exchange ${exchange}: ${message}`);
    }
}
