"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocketServer = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        socket.on('register', (data) => {
            const { userId, userRole } = data;
            socket.join(userId);
            socket.join(userRole);
            console.log(`User ${userId} registered as ${userRole}`);
        });
        socket.on('disconnect', () => {
            console.log('Notification : Client disconnected');
        });
    });
    return io;
};
exports.initSocketServer = initSocketServer;
const getIo = () => {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
};
exports.getIo = getIo;
