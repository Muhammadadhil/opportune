import { Channel } from "amqplib";
import { IApplicationService } from "../../../services/interfaces/IApplicationService";
import { rabbitMQConnection } from "../RabbitMQConnection";

export class CreateApplicationConsumer {

    private channel: Channel | null = null;

    constructor(
        private readonly applicationService: IApplicationService,
        private readonly queue: string
    ) {}

    async initialise(){
        try {
            this.channel = await rabbitMQConnection.createChannel();

            await this.channel.assertQueue(this.queue, {durable: true});
            console.log(`Waiting for messages in queue ${this.queue}`); 

            this.channel.consume(this.queue, async (msg) => {
                if (msg) {
                    try {
                        const messageContent = JSON.parse(msg.content.toString());
                        await this.applicationService.createApplication(messageContent);
                        this.channel?.ack(msg);
                    } catch (error) {
                        console.error(`Error processing message from queue ${this.queue}:`, error);
                    }
                }
            }, { noAck: false });

        } catch (error) {
            console.error("Error initializing consumer:", error);
        }
    }

}