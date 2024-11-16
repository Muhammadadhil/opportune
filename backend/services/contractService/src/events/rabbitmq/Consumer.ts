import amqplib from "amqplib";
import { rabbitMQConnection } from "./RabbitMQConnection";

export class RabbitMQConsumer {
    private channel: amqplib.Channel | null = null;

    async connect() {
        if (!this.channel) {
            this.channel = await rabbitMQConnection.createChannel();
        }
    }

    async consume(queue: string, callback: (message: any) => void) {
        if (!this.channel) {
            throw new Error("RabbitMQ consumer channel is not initialized");
        }

        await this.channel.assertQueue(queue);

        this.channel.consume(queue, (data) => {
            if (data) {
                console.log(`Consuming message from the queue : ${queue}`);
                const content = JSON.parse(data.content.toString());
                callback(content);
                this.channel?.ack(data);
            }
        });
    }
}
