import { BaseRepository } from "./base.repository";
import { IAdminTransaction } from "../../interfaces/IAdminTransactions";
import { IAdminTransactionRepository } from "../interface/IAdminTransaction";
import AdminTransaction from "../../schema/AdminTransactionSchema";

export class AdminTransactionRepository extends BaseRepository<IAdminTransaction> implements  IAdminTransactionRepository{
    constructor() {
        super(AdminTransaction);
    }


}