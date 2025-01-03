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
import { errorHandler } from '@_opportune/common'

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

// const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

const logStream= createStream("access.log", {
    interval: "10d",
    path: path.join(process.cwd(),"logs"),
    maxSize: "10M"
});


app.use(morgan("combined",{stream:logStream}));

const targets = {
    user: process.env.USER_API_BASE_URL,
    manage: process.env.MANAGE_API_BASE_URL,
    jobandGig: process.env.JOBANDGIG_BASE_URL,
    contract: process.env.CONTRACT_BASE_URL,
    payment: process.env.PAYMENT_BASE_URL,
    notification: process.env.NOTIFICATION_BASE_URL,
    messaging: process.env.MESSAGING_BASE_URL,
};

app.use(
    "/user",
    createProxyMiddleware({
        target: targets.user,
        changeOrigin: true,
    })
);

app.use(
    "/manage",
    createProxyMiddleware({
        target: targets.manage,
        changeOrigin: true,
    })
);

app.use(
    "/post",
    verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.jobandGig,
        changeOrigin: true,
    })
);

app.use(
    "/contract",
    verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.contract,
        changeOrigin: true,
    })
);

app.use(
    "/payment",
    // verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.payment,
        changeOrigin: true,
    })
);

app.use(
    "/notification",
    // verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.notification,
        changeOrigin: true,
    })
);

app.use(
    "/messaging",
    verifyToken(process.env.JWT_SECRET!),
    createProxyMiddleware({
        target: targets.messaging,
        changeOrigin: true,
    })
);

app.use(errorHandler);

const port = process.env.APIGATEWAY_PORT;


app.listen(port, () => console.log(`APIGateway server running on http://localhost:${port}`));
