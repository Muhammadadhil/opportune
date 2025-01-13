import mongoose, { ObjectId } from "mongoose";
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
    updateMilestoneStatus(contractId: string | ObjectId, milestoneId: string | ObjectId, newStatus: string, escrowId?: ObjectId, escrowStatus?: string): Promise<IContract | null>;
}