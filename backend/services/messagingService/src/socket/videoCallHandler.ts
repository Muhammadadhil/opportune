import { Namespace, Socket } from "socket.io";


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

                console.log('!!! initiating video call !!!');

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
                console.log("reciver socket id:", recieverSocketId);

                // notify the reciever   
                socket.to(recieverSocketId!).emit('incoming-call', callData);

                setTimeout(() => {
                    const call = activeCalls.get(data.roomId);
                    if (call && call.timeStamp === callData.timeStamp) {
                        handleMissedCall(data.roomId);
                    }
                }, CALL_TIMEOUT);

            })

            socket.on('accept-call', (roomId: string) => {

                console.log('!!! acceptingg call !!!') ;

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

        });

    } catch (error) {

        console.log('error', error)
    }
}

export default videoCallHandler;
