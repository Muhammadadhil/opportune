"use strict";
// import { IEscrow } from "../../interfaces/IEscrow";
// import { EscrowStatus } from "../../enums/EscrowStatus";
// import { IEscrowService } from "../interfaces/IEscrowService";
// import mongoose from "mongoose";
// import { IPayment } from "@_opportune/common";
// import { IEscrowRepository } from "../../repositories/interfaces/IEscrowRepository";
// export class EscrowService implements IEscrowService {
//     private _escrowRepository: IEscrowRepository;
//     constructor(escrowRepository: IEscrowRepository) {
//         this._escrowRepository = escrowRepository;
//     }
//     async createEscrow(payment:IPayment): Promise<IEscrow> {
//         const escrowData: Partial<IEscrow> = {
//             contractId: payment.contractId,
//             milestoneId: payment.milestoneId,
//             clientId: payment.clientId,
//             freelancerId: payment.freelancerId,
//             amount: payment.amount,
//             paymentId: payment._id,
//             status: EscrowStatus.HOLDING,
//         };
//         if (!escrowData.contractId || !escrowData.milestoneId || !escrowData.clientId || !escrowData.freelancerId || !escrowData.amount || !escrowData.paymentId) {
//             throw new Error("Missing required escrow data fields");
//         }
//         const escrow = await this._escrowRepository.create(escrowData as IEscrow);
//         // Update payment to associate with escrow
//         await Payment.findByIdAndUpdate(payment._id, { escrowId: escrow._id });
//         return escrow;
//     }
//     // async updateEscrowStatus(escrowId: string, status: EscrowStatus): Promise<IEscrow | null> {
//     //     return await this._escrowRepository.findByIdAndUpdate(
//     //         escrowId,
//     //         { status },
//     //         { new: true }
//     //     );
//     // }
//     // async getEscrowById(escrowId: string): Promise<IEscrow | null> {
//     //     return await this._escrowRepository.findById(escrowId);
//     // }
//     // async releaseFunds(escrowId: string): Promise<IEscrow | null> {
//     //     const escrow = await this._escrowRepository.findById(escrowId);
//     //     if (escrow && escrow.status === EscrowStatus.HOLDING) {
//     //         escrow.status = EscrowStatus.RELEASED;
//     //         return await escrow.save();
//     //     }
//     //     return null;
//     // }
// }
