"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const rotating_file_stream_1 = require("rotating-file-stream");
const path_1 = __importDefault(require("path"));
const verifyToken_1 = require("./verifyToken");
const common_1 = require("@_opportune/common");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
const logStream = (0, rotating_file_stream_1.createStream)("access.log", {
    interval: "10d",
    path: path_1.default.join(process.cwd(), "logs"),
    maxSize: "10M"
});
app.use((0, morgan_1.default)("combined", { stream: logStream }));
const targets = {
    user: process.env.USER_API_BASE_URL,
    manage: process.env.MANAGE_API_BASE_URL,
    posts: process.env.POSTS_BASE_URL,
    contract: process.env.CONTRACT_BASE_URL,
    payment: process.env.PAYMENT_BASE_URL,
    notification: process.env.NOTIFICATION_BASE_URL,
    messaging: process.env.MESSAGING_BASE_URL,
};
app.use("/user", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.user,
    changeOrigin: true,
}));
app.use("/manage", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.manage,
    changeOrigin: true,
}));
app.use("/post", (0, verifyToken_1.verifyToken)(process.env.JWT_SECRET), (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.posts,
    changeOrigin: true,
}));
app.use("/contract", (0, verifyToken_1.verifyToken)(process.env.JWT_SECRET), (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.contract,
    changeOrigin: true,
}));
app.use("/payment", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.payment,
    changeOrigin: true,
}));
app.use("/notification", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.notification,
    changeOrigin: true,
}));
app.use("/messaging", (0, verifyToken_1.verifyToken)(process.env.JWT_SECRET), (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.messaging,
    changeOrigin: true,
}));
app.use(common_1.errorHandler);
const port = process.env.APIGATEWAY_PORT;
app.listen(port, () => console.log(`APIGateway server running on http://localhost:${port}`));
