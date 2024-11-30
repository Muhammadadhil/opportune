import { IContract } from "../../interfaces/IContract";
import { IOffer } from "../../interfaces/IOffer";

export interface IContractService {
    // initialize(): void;
    createContract(data: IOffer): void;
    getFreelancerContracts(freelancerId: string): Promise<IContract[] | null>;
    getJobContracts(jobId: string): Promise<IContract[] | null>;
    getClientContracts(clientId: string): Promise<IContract[] | null>;
}