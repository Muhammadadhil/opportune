import { IEscrow } from "../../interfaces/IEscrow";
import { EscrowStatus } from "../../enums/EscrowStatus";
import { IPayment } from "@_opportune/common";

export interface IEscrowService {

    createEscrow(payment: IPayment): Promise<IEscrow>;
    // updateEscrowStatus(escrowId: string, status: EscrowStatus): Promise<IEscrow | null>;
    // getEscrowById(escrowId: string): Promise<IEscrow | null>;
    // releaseFunds(escrowId: string): Promise<IEscrow | null>;
}
