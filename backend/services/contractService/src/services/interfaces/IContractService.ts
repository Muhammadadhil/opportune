import mongoose from "mongoose";
import { IContract } from "../../interfaces/IContract";
import { IOffer } from "../../interfaces/IOffer";
import { IPayment } from '@_opportune/common'

export interface IContractService {
    // initialize(): void;
    createContract(data: IOffer): void;
    getFreelancerContracts(freelancerId: string): Promise<IContract[] | null>;
    getJobContracts(jobId: string): Promise<IContract[] | null>;
    getClientContracts(clientId: string): Promise<IContract[] | null>;
    postPaymentSuccess(data: IPayment): void;
    updateMilestoneStatus(contractId: mongoose.Types.ObjectId, milestoneId: mongoose.Types.ObjectId, newStatus: string): Promise<IContract | null>;
}