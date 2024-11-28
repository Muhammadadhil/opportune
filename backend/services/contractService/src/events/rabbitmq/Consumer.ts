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
        },{
            noAck:false   // manual ack
        });
    }

    async consumeFromFanoutExchange(exchange:string, callback:(message:any) => void){
        
        if (!this.channel) {
            throw new Error("RabbitMQ consumer channel is not initialized");
        }

        // Declare the exchange (fanout type)
        await this.channel.assertExchange(exchange, "fanout", { durable: true });

        // Create an anonymous queue (RabbitMQ will generate a unique name)
        const q = await this.channel.assertQueue("");

        await this.channel.bindQueue(q.queue,exchange,""); // "" - binding key

        console.log(`Waiting for messages in queue ${q.queue} from exchange ${exchange}`);

        this.channel.consume(q.queue,(msg)=> {
            if(msg){
                const messageContent = JSON.parse(msg.content.toString());
                callback(messageContent);
                this.channel?.ack(msg);
            }
        },{
            noAck:false
        })
    }
}
