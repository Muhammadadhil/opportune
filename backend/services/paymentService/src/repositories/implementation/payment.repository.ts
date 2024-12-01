
import { BaseRepository } from "./baseRepository";
import { IPayment } from "../../interfaces/IPayment";
import { IPaymentRepository } from "../interfaces/IPaymentRepository";
import { Model } from "mongoose";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor(offerModel: Model<IPayment>) {
        super(offerModel);
    }

    

}
