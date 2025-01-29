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
const MessageStatus_1 = require("../enums/MessageStatus");
const messageService = inversify_1.default.get(types_1.TYPES.IMessageService);
const videoCallHandler = (io) => {
    const activeCalls = new Map(); // roomId -> callData
    const userCallStatus = new Map(); // userId -> UserCallStatus
    const CALL_TIMEOUT = 30000;
    try {
        io.on("connection", (socket) => {
            socket.on("register-video", (data) => {
                userCallStatus.set(data.userId, { inCall: false, socketId: socket.id });
                console.log(`User ${data.userId} registered for video calls !!!!!`);
            });
            socket.on('initiateCall', (data) => {
                const receiverStatus = userCallStatus.get(data.receiver.userId);
                if (!receiverStatus) {
                    socket.emit('video-call-failed', { reason: 'User is Offline' });
                    return;
                }
                if (receiverStatus.inCall) {
                    socket.emit('video-call-failed', { reason: 'User is already in a call' });
                    return;
                }
                const callData = Object.assign(Object.assign({}, data), { timeStamp: new Date() });
                activeCalls.set(data.roomId, callData);
                const recieverSocketId = receiverStatus === null || receiverStatus === void 0 ? void 0 : receiverStatus.socketId;
                // console.log("reciver socket id:", recieverSocketId);
                // notify the reciever   
                socket.to(recieverSocketId).emit('incoming-call', callData);
                setTimeout(() => {
                    const call = activeCalls.get(data.roomId);
                    if (call && call.timeStamp === callData.timeStamp) {
                        handleMissedCall(data.roomId);
                    }
                }, CALL_TIMEOUT);
            });
            socket.on('accept-call', (data) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                const { roomId } = data;
                const callData = activeCalls.get(roomId);
                if (!callData)
                    return;
                userCallStatus.set(callData.caller.userId, {
                    inCall: true,
                    socketId: (_a = userCallStatus.get(callData.caller.userId)) === null || _a === void 0 ? void 0 : _a.socketId,
                    roomId
                });
                userCallStatus.set(callData.receiver.userId, {
                    inCall: true,
                    socketId: socket.id,
                    roomId
                });
                const callerSocketId = (_b = userCallStatus.get(callData.caller.userId)) === null || _b === void 0 ? void 0 : _b.socketId;
                socket.to(callerSocketId).emit('call-accepted', roomId);
                // Emit a message for call start
                console.log('roomId:', roomId);
                const chatRoomId = roomId.substring(0, 24);
                console.log('Attempting to emit newMessage to chatRoomId:', chatRoomId);
                // saving new message in db
                const newMessage = yield messageService.sendMessage(callData.caller.userId, callData.receiver.userId, `${callData.caller.userName} started a video call`, chatRoomId, MessageStatus_1.messageType.videoCallStarted);
                const messageData = {
                    sender: callData.caller.userId,
                    receiver: callData.receiver.userId,
                    content: `${callData.caller.userName} started a video call`,
                    chatRoom: chatRoomId,
                    messageType: MessageStatus_1.messageType.videoCallStarted,
                    createdAt: new Date()
                };
                console.log('messageData:', messageData);
                io.server.of('/chat').to(chatRoomId).emit('newMessage', messageData);
            }));
            socket.on('cancel-call', (data) => {
                var _a;
                const { roomId, receiverId } = data;
                const callData = activeCalls.get(roomId);
                if (!callData)
                    return;
                const receiverSocketId = (_a = userCallStatus.get(receiverId)) === null || _a === void 0 ? void 0 : _a.socketId;
                socket.to(receiverSocketId).emit('call-cancelled', roomId);
            });
            socket.on('reject-call', (data) => {
                var _a;
                const { roomId, callerId } = data;
                const callData = activeCalls.get(roomId);
                if (!callData)
                    return;
                const callerSocketId = (_a = userCallStatus.get(callerId)) === null || _a === void 0 ? void 0 : _a.socketId;
                socket.to(callerSocketId).emit('call-rejected', roomId);
            });
            const cleanUpCall = (roomId) => {
                var _a, _b;
                const callData = activeCalls.get(roomId);
                if (!callData) {
                    return;
                }
                // Reset user statuses
                userCallStatus.set(callData.caller.userId, {
                    inCall: false,
                    socketId: (_a = userCallStatus.get(callData.caller.userId)) === null || _a === void 0 ? void 0 : _a.socketId
                });
                userCallStatus.set(callData.receiver.userId, {
                    inCall: false,
                    socketId: (_b = userCallStatus.get(callData.receiver.userId)) === null || _b === void 0 ? void 0 : _b.socketId
                });
                activeCalls.delete(roomId);
            };
            const handleMissedCall = (roomId) => {
                var _a;
                const callData = activeCalls.get(roomId);
                if (!callData) {
                    return;
                }
                const callerSocketId = (_a = userCallStatus.get(callData.caller.userId)) === null || _a === void 0 ? void 0 : _a.socketId;
                io.to(callerSocketId).emit('call-missed', roomId);
                cleanUpCall(roomId);
            };
            // Add call end handler
            socket.on('end-call', (data) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('#################### Call ended ###################', data);
                const { roomId, duration } = data;
                const callData = activeCalls.get(roomId);
                if (!callData)
                    return;
                const chatRoomId = roomId.substring(0, 24);
                const formattedDuration = `Call ended • ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;
                // saving new message in db
                const newMessage = yield messageService.sendMessage(callData.caller.userId, callData.receiver.userId, formattedDuration, chatRoomId, MessageStatus_1.messageType.videoCallEnded, duration);
                const messageData = {
                    sender: callData.caller.userId,
                    receiver: callData.receiver.userId,
                    content: formattedDuration,
                    chatRoom: chatRoomId,
                    type: MessageStatus_1.messageType.videoCallEnded,
                    duration,
                    createdAt: new Date()
                };
                io.server.of('/chat').to(chatRoomId).emit('newMessage', messageData);
                cleanUpCall(roomId);
            }));
        });
    }
    catch (error) {
        console.log('error', error);
    }
};
exports.default = videoCallHandler;
