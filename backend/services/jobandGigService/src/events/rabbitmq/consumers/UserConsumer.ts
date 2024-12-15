import { Channel } from "amqplib";
import { rabbitMQConnection } from "@_opportune/common";
import { IUserService } from "../../../services/interfaces/IUserService";
import { inject, injectable } from "inversify";
import IConsumer from "@_opportune/common/dist/interfaces/IConsumer";

@injectable()
export class UserConsumer implements IConsumer{
    private channel: Channel | null = null;
    private exchangeName = "user_exchange";
    private userService:IUserService;

    constructor(@inject("IUserService") userService: IUserService) {
        this.userService = userService
    }

    async initialise() {
        try {
            this.channel = await rabbitMQConnection.createChannel();
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
                            this.userService.handleEvent(messageContent.eventType, messageContent);
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
