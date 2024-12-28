
import { BaseRepository } from "./baseRepository";
import { IEscrow } from "../../interfaces/IEscrow";
import EscrowModel from "../../schema/escrow.schema";
import { IEscrowRepository } from "../interfaces/IEscrowRepository";

export class EscrowRepository extends BaseRepository<IEscrow> implements IEscrowRepository {
    constructor() {
        super(EscrowModel);
    }
}
