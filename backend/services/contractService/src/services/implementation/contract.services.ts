
import { IContract } from "../../interfaces/IContract";
import { IContractService } from "../interfaces/IContractService";
import { ContractRepository } from "../../repositories/implementation/contract.repository";
import { IContractRepository } from "../../repositories/interfaces/IContractRepository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { ApplicationRepository } from "../../repositories/implementation/application.repository";
import { IMilestone, IOffer } from "../../interfaces/IOffer";
import { ContractStatus } from "../../enums/ContractStatus";
import { ApplicationStutus } from "../../enums/ApplicationStatus";
import { IPayment } from "@_opportune/common";
import { MilestoneStatus } from "../../enums/MIlestoneStatus";
import mongoose, { ObjectId } from "mongoose";

interface PaymentInfo extends IPayment {
    escrowId: ObjectId;
    escrowStatus: string;
}


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
                status: ContractStatus.PENDING,
                startDate: new Date(),
                endDate: this.calculateEndDate(data.milestones),
                clientNotes: "",
            };

            const contract = await this.contractRepository.create(contractData as IContract);
            await this.applicationRepository.updateStatus(data.applicationId, ApplicationStutus.ACCEPTED);
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

    async postPaymentSuccess(data: PaymentInfo): Promise<void> {

        console.log("payment success:", data);

        this.updateMilestoneStatus(data.contractId as ObjectId, data.milestoneId, MilestoneStatus.ACTIVE, data.escrowId,data.escrowStatus);
        const contract = await this.contractRepository.findById(data.contractId);

        if (contract && contract.status == ContractStatus.PENDING) {
            await this.contractRepository.update(contract._id as ObjectId,{status:ContractStatus.IN_PROGRESS});
        }
    }

    async updateMilestoneStatus(contractId: string | ObjectId, milestoneId: string | ObjectId, newStatus: string,escrowId:ObjectId,escrowStatus:string): Promise<IContract | null> {
        
        const contract = await this.contractRepository.findById(contractId as ObjectId);
        console.log('contract to update milestone dtila:',contract)
        console.log("milestoneId:", milestoneId);

        if (contract) {
            const milestone = contract.milestones.find((m) => m._id == milestoneId);
            console.log('milestone to update:',milestone);
            
            if (milestone) {
                milestone.status = newStatus;
                milestone.escrowId = escrowId;
                milestone.escrowStatus = escrowStatus
            };

            // Auto-complete contract if all milestones are completed
            if (contract.milestones.every((m) => m.status === MilestoneStatus.COMPLETED)) {
                contract.status = ContractStatus.COMPLETED;
            }
            return this.contractRepository.update(contractId as ObjectId, contract);
        } else {
            throw new Error("Contract not found");
            return null;
        }
    }
}
