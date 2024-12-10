import amqplib from "amqplib";

class RabbitMQConnection {
    private connection: amqplib.Connection | null = null;

    async getConnection(): Promise<amqplib.Connection> {
        if (!this.connection) {
            this.connection = await amqplib.connect("amqp://localhost:5672");
        }
        return this.connection;
    }

    async createChannel(): Promise<amqplib.Channel> {
        const connection = await this.getConnection();
        // console.log("Created connection and Channel : ContractService");
        return await connection.createChannel();
    }
}

export const rabbitMQConnection = new RabbitMQConnection();
