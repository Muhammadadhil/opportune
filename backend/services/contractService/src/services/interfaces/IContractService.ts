import { IContract } from "../../interfaces/IContract";

export interface IContractService {
    initialize(): void;
    createContract(data: IContract): Promise<IContract | null>;
}