import { Channel } from "amqplib";
import { rabbitMQInstance } from "../../../config/rabbitmq.connection";
import { IUserService } from "../../../services/interfaces/IUserService";
import IConsumer from "../../../interfaces/IConsumer";

export class UserConsumer implements IConsumer{
    private channel: Channel | null = null;
    private exchangeName = "user_exchange";
    private userService:IUserService;

    constructor( userService: IUserService) {
        this.userService = userService
    }

    async initialise() {
        try {
            this.channel = await rabbitMQInstance.createChannel();
            await this.channel.assertExchange(this.exchangeName, "fanout", { durable: true });

            const q = await this.channel.assertQueue("");
            await this.channel.bindQueue(q.queue, this.exchangeName, "");

            console.log(`contract service: Waiting for messages in queue ${q.queue} from exchange : ${this.exchangeName}`);

            this.channel.consume(
                q.queue,
                async (msg) => {
                    if (msg) {
                        try {
                            const messageContent = JSON.parse(msg.content.toString());
                            console.log("contract service: consuming from the exchange:", this.exchangeName);
                            console.log("consuming message:", messageContent);
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
