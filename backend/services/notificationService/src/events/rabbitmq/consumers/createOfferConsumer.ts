import { Channel } from "amqplib";
import { INotificatoinService } from "../../../services/interfaces/INotificationService";
import { rabbitMQInstance } from "../../../config/rabbitmq.connection";


export class CreateOfferConsumer {
    private channel: Channel | null = null;
    constructor(private readonly notificationService: INotificatoinService, private readonly exchangeName: string) {}

    async initialise() {
        try {
            this.channel = await rabbitMQInstance.createChannel();
            await this.channel.assertExchange(this.exchangeName, "fanout", { durable: true });

            const q = await this.channel.assertQueue("");

            await this.channel.bindQueue(q.queue, this.exchangeName, "");

            console.log(`Waiting for messages in queue ${q.queue} from exchange : ${this.exchangeName}`);

            this.channel.consume(
                q.queue,
                async (msg) => {
                    if (msg) {
                        try {
                            const messageContent = JSON.parse(msg.content.toString());
                            // await this.notificationService.createNotification(messageContent);
                            
                            this.channel?.ack(msg);
                        } catch (error) {
                            console.error(`Error processing message from exchange ${this.exchangeName}:`, error);
                        }
                    }
                },
                { noAck: false }
            );
        } catch (error) {
            console.error("Error initializing offer consumer:", error);
        }
    }
}