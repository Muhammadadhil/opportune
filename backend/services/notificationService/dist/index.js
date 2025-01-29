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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const socketServer_1 = require("./config/socketServer");
const common_1 = require("@_opportune/common");
const common_2 = require("@_opportune/common");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/", route_1.default);
app.use(common_2.errorHandler);
(0, common_1.connectMongoDB)(process.env.MONGODB_URL, "notification");
const PORT = process.env.PORT || 3050;
const server = http_1.default.createServer(app);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, socketServer_1.initSocketServer)(server);
        server.listen(PORT, () => {
            console.log(`notification-server is running on the port ${PORT}`);
        });
        // await intialiseConsumers()
    }
    catch (error) {
        console.log("Error in starting notification Server", error);
        process.exit(1);
    }
});
startServer();
