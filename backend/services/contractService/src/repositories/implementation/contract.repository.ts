
import { IContract } from "../../interfaces/IContract";
import { BaseRepository } from "./baseRepository";
import ContractModel from "../../schema/contract.schema";
import { IContractRepository } from "../interfaces/IContractRepository";

export class ContractRepository extends BaseRepository<IContract> implements IContractRepository {
    
    constructor() {
        super(ContractModel);
    }
}
