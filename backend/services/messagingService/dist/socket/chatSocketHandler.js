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
const inversify_1 = __importDefault(require("../config/inversify"));
const types_1 = require("../interfaces/types");
const messageService = inversify_1.default.get(types_1.TYPES.IMessageService);
const socketHandler = (io) => {
    const onlineUsers = new Set();
    const userSocketMap = new Map();
    try {
        io.on('connection', (socket) => {
            socket.on('register', (data) => {
                const { userId } = data;
                userSocketMap.set(socket.id, userId);
                onlineUsers.add(userId);
                // Broadcast to others that this user is online
                socket.broadcast.emit('userOnline', userId);
                // Send current online users list to the newly connected user
                socket.emit('getOnlineUsers', Array.from(onlineUsers));
            });
            console.log('socket rooms:', socket.rooms);
            socket.on('joinRoom', (chatRoomId) => {
                socket.join(chatRoomId);
            });
            // send a message
            socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
                const newMessage = yield messageService.sendMessage(message.sender, message.receiver, message.content, message.chatRoom);
                console.log('new message to chatRoom:', message.chatRoom);
                socket.broadcast.to(message.chatRoom).emit("newMessage", message);
            }));
            socket.on('disconnect', () => {
                // console.log('Client disconnected');
                const userId = userSocketMap.get(socket.id);
                if (userId) {
                    onlineUsers.delete(userId);
                    userSocketMap.delete(socket.id);
                    socket.broadcast.emit('userOffline', userId);
                }
            });
        });
    }
    catch (error) {
        console.log('socketHandler error:', error);
    }
};
exports.default = socketHandler;
