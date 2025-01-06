import { IAdminTransaction } from "../../interfaces/IAdminTransactions";

export interface IAdminTransactionService {
    recordCommission(
        amount: number,
        escrowData: {
            _id: string;
            jobId: string;
            freelancerId: string;
            clientId: string;
        }
    ): Promise<IAdminTransaction>;

    getTransactions({}:any): Promise<IAdminTransaction[]>;
}
