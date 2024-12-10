
import { Channel } from "amqplib";
import { RabbitMQConsumer } from "../Consumer";
import { IContractService } from "../../../services/interfaces/IContractService";
import { rabbitMQConnection } from "../RabbitMQConnection";

export class JobApprovalConsumer {

    private channel : Channel | null = null;

    constructor(
        private readonly contractService:IContractService,
        private readonly exchangeName:string
    ){}

    async initialise(){
        try {
            
            this.channel = await rabbitMQConnection.createChannel();
            await this.channel.assertExchange(this.exchangeName, "fanout", { durable: true });
            const q = await this.channel.assertQueue("");

            await this.channel.bindQueue(q.queue,this.exchangeName,""); // "" - binding key

            console.log(`Waiting for messages in queue ${q.queue} from exchange : ${this.exchangeName}`);

            this.channel.consume(q.queue, async (msg) => {
                    if (msg) {
                        try {
                            const messageContent = JSON.parse(msg.content.toString());
                            await this.contractService.createContract(messageContent);
                            this.channel?.ack(msg);
                        } catch (error) {
                            console.error(`Error processing message from exchange ${this.exchangeName}:`, error);
                        }
                    }
                },
                { noAck: false,}
            );

        } catch (error) {
            console.error("Error initializing consumer:", error);
        }
    }    
}