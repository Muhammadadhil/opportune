"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrowRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const escrow_schema_1 = __importDefault(require("../../schema/escrow.schema"));
class EscrowRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(escrow_schema_1.default);
        this.escrowModel = escrow_schema_1.default;
    }
    getAllHoldingEscrows() {
        return this.escrowModel.find();
    }
}
exports.EscrowRepository = EscrowRepository;
