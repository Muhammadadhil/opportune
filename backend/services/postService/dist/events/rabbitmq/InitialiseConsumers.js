"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialiseConsumers = void 0;
const inversify_1 = __importDefault(require("../../config/inversify"));
const types_1 = require("../../types/types");
const InitialiseConsumers = () => {
    const userConsumer = inversify_1.default.get(types_1.TYPES.IUserConsumer);
    userConsumer.initialise();
};
exports.InitialiseConsumers = InitialiseConsumers;
