
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { IContract } from "../../interfaces/IContract";
import { IContractService } from "../interfaces/IContractService";
import { ContractRepository } from "../../repositories/implementation/contract.repository";
import { IContractRepository } from "../../repositories/interfaces/IContractRepository";

export class ContractService implements IContractService {
    private contractRepository:IContractRepository;

    private consumer;

    constructor() {
        this.contractRepository = new ContractRepository();
        this.consumer = new RabbitMQConsumer();
    }

    async initialize() {
        try {
            await this.consumer.connect();

            const exchangeName = "job_approval_exchange";
            await this.consumer.consumeFromFanoutExchange(exchangeName, (message) => {
                console.log("Processing job approval message:", message);

                this.createContract(message);
            });
        } catch (error) {
            console.error("Failed to initialize Contract Service:", error);
        }
    }

    async createContract(data: IContract): Promise<IContract | null> {
        try {
            console.log("data in create Contract:", data);
            const contract = await this.contractRepository.create(data);
            return contract;
        } catch (error) {
            console.log("Error in creating Contract:", error);
            return null;
        }
    }
}
