
import { BaseRepository } from "./baseRepository";
import { IPayment } from "../../interfaces/IPayment";
import { IPaymentRepository } from "../interfaces/IPaymentRepository";
import { Model } from "mongoose";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    private paymentModel;

    constructor(paymentModel: Model<IPayment>) {
        super(paymentModel);
        this.paymentModel = paymentModel;
    }

    // async getAllPaymentsWithEscrow(){
    //     await this.paymentModel.
    // }
    

}
