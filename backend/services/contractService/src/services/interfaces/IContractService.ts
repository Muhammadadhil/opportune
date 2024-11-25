import { IContract } from "../../interfaces/IContract";

export interface IContractService {
    initialize(): void;
    createContract(data: IContract): Promise<IContract | null>;
    getFreelancerContracts(freelancerId: string): Promise<IContract[] | null>;
    getJobContracts(jobId: string): Promise<IContract[] | null>;
}