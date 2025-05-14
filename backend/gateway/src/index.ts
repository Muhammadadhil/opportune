import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import { verifyToken } from "./verifyToken";
import { errorHandler } from "@_opportune/common";

dotenv.config();

const app = express();

const targets = {
    user: process.env.USER_API_BASE_URL,
    manage: process.env.MANAGE_API_BASE_URL,
    posts: process.env.POSTS_BASE_URL,
    contract: process.env.CONTRACT_BASE_URL,
    payment: process.env.PAYMENT_BASE_URL,
    notification: process.env.NOTIFICATION_BASE_URL,
    messaging: process.env.MESSAGING_BASE_URL,
};

const DEFAULT_TIMEOUT = 60000; 

app.use(
    "/api/payment",
    createProxyMiddleware({
        target: targets.payment,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(cookieParser());

const allowedOrigins = [process.env.LOCAL_ORIGIN?.replace(/\/$/, ""), process.env.VERCEL_ORIGIN?.replace(/\/$/, ""), process.env.PRODUCTION_ORIGIN?.replace(/\/$/, "")];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

const logStream = createStream("access.log", {
    interval: "10d",
    path: path.join(process.cwd(), "logs"),
    maxSize: "10M",
});

app.use(morgan("combined", { stream: logStream }));

app.use(
    "/api/user",
    createProxyMiddleware({
        target: targets.user,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(
    "/api/manage",
    createProxyMiddleware({
        target: targets.manage,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(
    "/api/post",
    // verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.posts,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(
    "/api/contract",
    verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.contract,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(
    "/api/notification",
    createProxyMiddleware({
        target: targets.notification,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(
    "/api/messaging",
    verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.messaging,
        changeOrigin: true,
        proxyTimeout: DEFAULT_TIMEOUT,
        timeout: DEFAULT_TIMEOUT,
    })
);

app.use(errorHandler);

const port = process.env.APIGATEWAY_PORT;

app.listen(port, () => console.log(`APIGateway server running on http://localhost:${port}`));
