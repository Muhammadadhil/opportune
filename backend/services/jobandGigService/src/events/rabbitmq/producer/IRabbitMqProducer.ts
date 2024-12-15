export interface IRabbitMQProducer {
    connect(): Promise<void>;
    publish(queue: string, message: any): Promise<void>;
    publishToMultiple(exchange: string, message: any): Promise<void>;
}
