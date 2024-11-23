
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { IContract } from "../../interfaces/IContract";
import { IContractService } from "../interfaces/IContractService";
import { ContractRepository } from "../../repositories/implementation/contract.repository";
import { IContractRepository } from "../../repositories/interfaces/IContractRepository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { ApplicationRepository } from "../../repositories/implementation/application.repository";

export class ContractService implements IContractService {
    private contractRepository: IContractRepository;
    private applicationRepository: IApplicationRepository;

    private consumer;

    constructor() {
        this.contractRepository = new ContractRepository();
        this.applicationRepository = new ApplicationRepository();
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
            console.log("application data to save:", data);
            const contract = await this.contractRepository.create(data);
            console.log("contract saved:", contract);
            await this.applicationRepository.updateStatus(contract.applicationId, "accepted");
            return contract;
        } catch (error) {
            console.log("Error in creating Contract:", error);
            return null;
        }
    }

    async getFreelancerContracts(freelancerId: string): Promise<IContract[] | null> {
        try {
            return this.contractRepository.find({ freelancerId });
        } catch (error) {
            console.log("Error in getting freelancer contracts:", error);
            return null;
        }
    }
}
