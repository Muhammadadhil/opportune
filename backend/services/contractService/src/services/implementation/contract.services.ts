
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

    constructor(contractRepository: IContractRepository,applicationRepository:IApplicationRepository) {
        this.contractRepository = contractRepository;
        this.applicationRepository = applicationRepository;
    }

    async createContract(data: IContract): Promise<IContract | null> {
        try {
            const contract = await this.contractRepository.create(data);
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

    async getJobContracts(jobId: string): Promise<IContract[] | null> {
        return this.contractRepository.find({ jobId });
    }
}
