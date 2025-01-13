
import { BaseRepository } from "./baseRepository";
import { IEscrow } from "../../interfaces/IEscrow";
import EscrowModel from "../../schema/escrow.schema";
import { IEscrowRepository } from "../interfaces/IEscrowRepository";
import { EscrowStatus } from "../../enums/EscrowStatus";

export class EscrowRepository extends BaseRepository<IEscrow> implements IEscrowRepository {
    private escrowModel: typeof EscrowModel;
    constructor() {
        super(EscrowModel);
        this.escrowModel = EscrowModel;
    }

    getAllHoldingEscrows(): Promise<IEscrow[]> {
        return this.escrowModel.find();
    }
}
