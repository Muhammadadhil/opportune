"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const common_1 = require("@_opportune/common");
const http_1 = __importDefault(require("http"));
const socketServer_1 = require("./socket/socketServer");
const common_2 = require("@_opportune/common");
const InitialiseConsumers_1 = require("./events/rabbitmq/InitialiseConsumers");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/", route_1.default);
app.use(common_2.errorHandler);
(0, common_1.connectMongoDB)(process.env.MONGODB_URL, "messaging");
const PORT = process.env.PORT || 3060;
const server = http_1.default.createServer(app);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, socketServer_1.initSocketServer)(server);
        server.listen(PORT, () => {
            console.log(`messaging-server is running on the port ${PORT}`);
        });
        yield (0, InitialiseConsumers_1.InitialiseConsumers)();
    }
    catch (error) {
        console.log("Error in starting messaging Server", error);
        process.exit(1);
    }
});
startServer();
