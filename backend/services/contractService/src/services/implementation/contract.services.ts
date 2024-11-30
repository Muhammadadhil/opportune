
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { IContract } from "../../interfaces/IContract";
import { IContractService } from "../interfaces/IContractService";
import { ContractRepository } from "../../repositories/implementation/contract.repository";
import { IContractRepository } from "../../repositories/interfaces/IContractRepository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { ApplicationRepository } from "../../repositories/implementation/application.repository";
import { IMilestone, IOffer } from "../../interfaces/IOffer";

export class ContractService implements IContractService {
    private contractRepository: IContractRepository;
    private applicationRepository: IApplicationRepository;

    constructor(contractRepository: IContractRepository, applicationRepository: IApplicationRepository) {
        this.contractRepository = contractRepository;
        this.applicationRepository = applicationRepository;
    }

    async createContract(data: IOffer) {
        try {
            console.log("data in createContract from offerService:", data);
            const contractData = {
                offerId: data._id,
                freelancerId: data.freelancerId,
                clientId: data.clientId,
                jobId: data.jobId,
                workTitle: data.workTitle,
                workDescription: data.workDescription,
                totalAmount: data.totalAmount,
                milestones: data.milestones,
                status: "active",
                startDate: new Date(),
                endDate: this.calculateEndDate(data.milestones), // Calculate end date based on milestone deadlines
                clientNotes: "",
            };

            const contract = await this.contractRepository.create(contractData as IContract);
            await this.applicationRepository.updateStatus(data.applicationId, "accepted");
            return contract;
        } catch (error) {
            console.log("Error in creating Contract:", error);
            return null;
        }
    }

    private calculateEndDate(milestones: IMilestone[]): Date {
        return new Date(Math.max(...milestones.map((milestone) => new Date(milestone.deadline).getTime())));
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

    async getClientContracts(clientId: string): Promise<IContract[] | null> {
        try {
            return this.contractRepository.find({ clientId });
        } catch (error) {
            console.log("Error in getting client contracts:", error);
            return null;
        }
    }
}
