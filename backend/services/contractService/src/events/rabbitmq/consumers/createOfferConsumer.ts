import { Channel } from "amqplib";
import { IOfferService } from "../../../services/interfaces/IOfferService";
import { rabbitMQConnection } from "@_opportune/common";



export class CreateOfferConsumer {

    private channel : Channel | null = null
    constructor(
        private readonly offerService:IOfferService,
        private readonly exchangeName:string
    ){}

    async initialise(){
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

                            console.log('consuming message from exchange offer_created:', this.exchangeName);

                            const messageContent = JSON.parse(msg.content.toString());
                            await this.offerService.createOffer(messageContent);
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