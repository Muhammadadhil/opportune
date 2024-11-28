
import { IContract } from "../../interfaces/IContract";
import { BaseRepository } from "./baseRepository";
import ContractModel from "../../schema/contract.schema";
import { IContractRepository } from "../interfaces/IContractRepository";
import { Model } from "mongoose";

export class ContractRepository extends BaseRepository<IContract> implements IContractRepository {
    constructor(contractModel:Model<IContract>) {
        super(contractModel);
    }
}
