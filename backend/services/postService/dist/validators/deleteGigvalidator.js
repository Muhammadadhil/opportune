"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGigValidator = void 0;
const express_validator_1 = require("express-validator");
exports.deleteGigValidator = [(0, express_validator_1.param)("id").isMongoId().withMessage("Invalid ID format. Must be a valid MongoDB ObjectId")];
