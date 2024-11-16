// import { IGig } from "../../interfaces/IGig";
import { GigRepository } from "../../repositories/implementation/gig.repository";
import { IGigRepositoy } from "../../repositories/interfaces/IGigRepository";
import { IApplicationService } from "../interfaces/IApplicationService";
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { IApplication } from "../../interfaces/IApplication";

export class ApplicationSerivce implements IApplicationService {
    private gigRepository: IGigRepositoy;
    private consumer = new RabbitMQConsumer();

    constructor() {
        this.gigRepository = new GigRepository();
    }

    async initialize() {
        await this.consumer.connect();
        this.consumer.consume("job.application.created", (message) => {
            console.log("Processing job application:", message);
        });
    }

    // async createApplication(data: IApplication): Promise<IApplication | null>{
        
    // };
}
