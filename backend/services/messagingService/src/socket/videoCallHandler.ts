import { Namespace, Socket } from "socket.io";
import container from "../config/inversify";
import { IMessageService } from "../services/interfaces/IMessageService";
import { TYPES } from "../interfaces/types";
import { ObjectId } from "mongoose";
import { messageType } from "../enums/MessageStatus";


interface callData {
    roomId: string;
    caller: { userId: string; userName: string };
    receiver: { userId: string; userName: string };
    timeStamp: Date;
}

interface userCallStatus {
    inCall: boolean;
    socketId?: string;
    roomId?: string;
}

const messageService = container.get<IMessageService>(TYPES.IMessageService);


const videoCallHandler = (io: Namespace) => {

    const activeCalls = new Map<string, callData>(); // roomId -> callData
    const userCallStatus = new Map<string, userCallStatus>(); // userId -> UserCallStatus

    const CALL_TIMEOUT = 30000;

    try {
        io.on("connection", (socket) => {

            socket.on("register-video", (data: { userId: string; userName: string }) => {

                userCallStatus.set(data.userId, { inCall: false, socketId: socket.id });
                console.log(`User ${data.userId} registered for video calls !!!!!`);

            });

            socket.on('initiateCall', (data: {
                roomId: string;
                caller: { userId: string; userName: string };
                receiver: { userId: string; userName: string };
            }
            ) => {

                const receiverStatus = userCallStatus.get(data.receiver.userId);

                if (!receiverStatus) {
                    socket.emit('video-call-failed', { reason: 'User is Offline' })
                    return;
                }

                if (receiverStatus.inCall) {
                    socket.emit('video-call-failed', { reason: 'User is already in a call' })
                    return;
                }

                const callData: callData = {
                    ...data,
                    timeStamp: new Date(),
                };

                activeCalls.set(data.roomId, callData);

                const recieverSocketId = receiverStatus?.socketId;
                // console.log("reciver socket id:", recieverSocketId);

                // notify the reciever   
                socket.to(recieverSocketId!).emit('incoming-call', callData);

                setTimeout(() => {
                    const call = activeCalls.get(data.roomId);
                    if (call && call.timeStamp === callData.timeStamp) {
                        handleMissedCall(data.roomId);
                    }
                }, CALL_TIMEOUT);

            })

            socket.on('accept-call', async(data: any) => {
                const { roomId } = data;
                const callData = activeCalls.get(roomId);
                if (!callData) return;

                userCallStatus.set(callData.caller.userId, {
                    inCall: true,
                    socketId: userCallStatus.get(callData.caller.userId)?.socketId,
                    roomId
                });

                userCallStatus.set(callData.receiver.userId, {
                    inCall: true,
                    socketId: socket.id,
                    roomId
                });

                const callerSocketId = userCallStatus.get(callData.caller.userId)?.socketId;

                socket.to(callerSocketId!).emit('call-accepted', roomId);


                // Emit a message for call start

                console.log('roomId:', roomId);

                const chatRoomId = roomId.substring(0,24);
                console.log('Attempting to emit newMessage to chatRoomId:', chatRoomId);
                

                // saving new message in db
                const newMessage = await messageService.sendMessage(
                    callData.caller.userId as unknown as ObjectId,
                    callData.receiver.userId as unknown as ObjectId, 
                    `${callData.caller.userName} started a video call`,
                    chatRoomId,
                    messageType.videoCallStarted
                );  

                const messageData = {
                    sender: callData.caller.userId,
                    receiver: callData.receiver.userId,
                    content: `${callData.caller.userName} started a video call`,
                    chatRoom: chatRoomId,
                    messageType: messageType.videoCallStarted,
                    createdAt: new Date()
                };

                console.log('messageData:', messageData);

                io.server.of('/chat').to(chatRoomId).emit('newMessage', messageData);

            })

            socket.on('cancel-call', (data: any) => {
                const { roomId, receiverId } = data;
                const callData = activeCalls.get(roomId);
                if (!callData) return;

                const receiverSocketId = userCallStatus.get(receiverId)?.socketId;

                socket.to(receiverSocketId!).emit('call-cancelled', roomId);
            })

            socket.on('reject-call', (data: any) => {

                const { roomId, callerId } = data;
                const callData = activeCalls.get(roomId);
                if (!callData) return;

                const callerSocketId = userCallStatus.get(callerId)?.socketId;
                socket.to(callerSocketId!).emit('call-rejected', roomId);
            })

            const cleanUpCall = (roomId: string) => {

                const callData = activeCalls.get(roomId);
                if (!callData) {
                    return;
                }
                // Reset user statuses
                userCallStatus.set(callData.caller.userId, {
                    inCall: false,
                    socketId: userCallStatus.get(callData.caller.userId)?.socketId
                });

                userCallStatus.set(callData.receiver.userId, {
                    inCall: false,
                    socketId: userCallStatus.get(callData.receiver.userId)?.socketId
                });

                activeCalls.delete(roomId);
            }

            const handleMissedCall = (roomId: string) => {
                const callData = activeCalls.get(roomId);
                if (!callData) {
                    return;
                }

                const callerSocketId = userCallStatus.get(callData.caller.userId)?.socketId;
                io.to(callerSocketId!).emit('call-missed', roomId);

                cleanUpCall(roomId);
            }

            // Add call end handler
            socket.on('end-call',async (data: {roomId: string, duration: number}) => {

                console.log('#################### Call ended ###################', data);

                const { roomId, duration } = data;
                const callData = activeCalls.get(roomId);
                if (!callData) return;

                const chatRoomId = roomId.substring(0,24);
                
                const formattedDuration = `Call ended • ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;

                // saving new message in db
                const newMessage = await messageService.sendMessage(
                    callData.caller.userId as unknown as ObjectId,
                    callData.receiver.userId as unknown as ObjectId, 
                    formattedDuration,
                    chatRoomId,
                    messageType.videoCallEnded,
                    duration
                );

                const messageData = {
                    sender: callData.caller.userId,
                    receiver: callData.receiver.userId,
                    content: formattedDuration,
                    chatRoom: chatRoomId,
                    type: messageType.videoCallEnded,
                    duration,
                    createdAt: new Date()
                };

                io.server.of('/chat').to(chatRoomId).emit('newMessage', messageData);

                cleanUpCall(roomId);
            });

        });

    } catch (error) {

        console.log('error', error)
    }
}

export default videoCallHandler;
