import { inject, injectable } from "inversify";
import { IAdminTransactionService } from "../interfaces/IAdmin.transactionService";
import { IAdminTransactionRepository } from "../../repositories/interface/IAdminTransaction";
import { TransactionType } from "../../enums/TransactionType";
// importimport { IAdminTransaction } from "../../interfaces/IAdminTransactions";
import { IAdminTransaction } from "../../interfaces/IAdminTransactions";
import { TYPES } from "../../interfaces/types";

@injectable()
export class AdminTransactionService implements IAdminTransactionService {
    private _adminTransactionRepository: IAdminTransactionRepository;

    constructor(@inject(TYPES.IAdminTransactionRepository) adminTransactionRepository: IAdminTransactionRepository) {
        this._adminTransactionRepository = adminTransactionRepository;
    }

    async recordCommission(
        amount: number,
        escrowData: {
            _id: string;
            jobId: string;
            freelancerId: string;
            clientId: string;
        }
    ): Promise<IAdminTransaction> {
        

        const transaction = await this._adminTransactionRepository.create({
            amount,
            type: TransactionType.ESCROW_COMMISSION,
            escrowId: escrowData._id,
            jobId: escrowData.jobId,
            freelancerId: escrowData.freelancerId,
            clientId: escrowData.clientId,
            description: `10% commission from escrow release for job ${escrowData.jobId}`,
        } as unknown as IAdminTransaction);

        return transaction;
    }

    async getTransactions(query: any = {}):Promise<IAdminTransaction[]> {
        return this._adminTransactionRepository.find(query);
    }
}