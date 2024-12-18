// import amqp from "amqplib";

// export const RabbitMQConnection = async (url: string): Promise<amqp.Channel> => {

//     let connection: amqp.Connection | null = null;
//     let ATTEMPT = 0;
//     let RETRIES = 10;
//     let DELAY = 5000;

//     while (!connection) {
//         try {
//             connection = await amqp.connect(url);
//             console.log("successfully connected to rabbitmq");
//         } catch (err) {
//             console.log(`failed to connect to rabbitmq retry in 5 seconds => ${ATTEMPT}th attempt`);
//             ATTEMPT++;

//             if (ATTEMPT > RETRIES) {
//                 throw new Error("Failed to connect to RabbitMQ after multiple attempts");
//             }

//             await new Promise((res) => setTimeout(res, DELAY));
//         }
//     }

//     return await connection.createChannel();
// };

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
