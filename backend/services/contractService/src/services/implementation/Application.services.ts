import { ApplicationRepository } from "../../repositories/implementation/application.repository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IApplicationService } from "../interfaces/IApplicationService";
import { IApplication } from "../../interfaces/IApplication";
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { RabbitMQProducer } from "../../events/rabbitmq/Producer";
import { IContract } from "../../interfaces/IContract";

export class ApplicationSerivce implements IApplicationService {
    private applicationRepository: IApplicationRepository;
    private consumer;
    private producer;

    constructor() {
        this.applicationRepository = new ApplicationRepository();
        this.consumer = new RabbitMQConsumer();
        this.producer = new RabbitMQProducer();
    }

    async initialize() {
        try {
            await this.consumer.connect();
            await this.producer.connect();

            await this.consumer.consume("job.application.created", (message) => {
                console.log("Processing job application:", message);

                const application = this.createApplication(message);

                if (!application) {
                    throw new Error("failed to create application");
                }
            });
            
        } catch (error) {
            console.error("Failed to initialize ApplicationService:", error);

            await this.producer.publish("job.application.failed", {
                success: false,
                // error: error?.message || "Application process failed",
                error: "Application process failed",
                timestamp: new Date().toISOString(),
            });
        }
    }

    async createApplication(data: IApplication): Promise<IApplication | null> {
        try {
            console.log("data in createApplication:", data);
            return this.applicationRepository.create(data);
        } catch (error) {
            console.log("Error in saving application:", error);
            return null;
        }
    }

    // async createContract(data: IContract): Promise<IContract | null> {
    //     try {
    //         console.log("data in createApplication:", data);
    //         return this.applicationRepository.create(data);
    //     } catch (error) {
    //         console.log("Error in saving application:", error);
    //         return null;
    //     }
    // }
}
