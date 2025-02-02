"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../config/container");
const router = (0, express_1.Router)();
router.post('/', container_1.paymentController.handleWebhook.bind(container_1.paymentController));
exports.default = router;
