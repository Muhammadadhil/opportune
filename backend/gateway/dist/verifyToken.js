"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const common_1 = require("@_opportune/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isTokenExpired = (token) => {
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded || !decoded.exp) {
        throw new common_1.Unauthorised("Invalid token");
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
};
const verifyToken = (secret) => {
    return (req, res, next) => {
        var _a;
        try {
            console.log("!!!!! verifying token !!!!!");
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token)
                throw new common_1.Unauthorised("Token not found");
            if (isTokenExpired(token)) {
                throw new common_1.Unauthorised("Token expired");
            }
            const payload = jsonwebtoken_1.default.verify(token, secret);
            if (!payload)
                throw new common_1.Unauthorised("Invalid token");
            // req.user = payload;
            req.headers["x-user-payload"] = JSON.stringify(payload);
            next();
        }
        catch (err) {
            console.log('Error in verifying token: gateway:', err);
            next(err);
        }
    };
};
exports.verifyToken = verifyToken;
