"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const baseRepository_1 = require("./baseRepository");
class PaymentRepository extends baseRepository_1.BaseRepository {
    constructor(paymentModel) {
        super(paymentModel);
        this.paymentModel = paymentModel;
    }
}
exports.PaymentRepository = PaymentRepository;
