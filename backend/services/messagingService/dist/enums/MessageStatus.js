"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageType = exports.messageStatus = void 0;
var messageStatus;
(function (messageStatus) {
    messageStatus["sent"] = "sent";
    messageStatus["delivered"] = "delivered";
    messageStatus["read"] = "read";
})(messageStatus || (exports.messageStatus = messageStatus = {}));
var messageType;
(function (messageType) {
    messageType["text"] = "text";
    messageType["image"] = "image";
    messageType["file"] = "file";
    messageType["videoCallStarted"] = "videoCallStarted";
    messageType["videoCallEnded"] = "videoCallEnded";
    messageType["videoCallMissed"] = "videoCallMissed";
    messageType["videoCallRejected"] = "videoCallRejected";
})(messageType || (exports.messageType = messageType = {}));
