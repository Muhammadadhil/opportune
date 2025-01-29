"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const chatSocketHandler_1 = __importDefault(require("./chatSocketHandler"));
const videoCallHandler_1 = __importDefault(require("./videoCallHandler"));
let io;
const initSocketServer = (httpServer) => {
    console.log('initiialising socket server !!!!!');
    io = new socket_io_1.Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const chatNameSpace = io.of('/chat');
    const videoNameSpace = io.of("/videoCall");
    (0, chatSocketHandler_1.default)(chatNameSpace);
    (0, videoCallHandler_1.default)(videoNameSpace);
};
exports.initSocketServer = initSocketServer;
