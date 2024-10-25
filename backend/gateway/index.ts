import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

app.use(helmet()); 
app.use(morgan("combined"));

const targets = {
    user: process.env.USER_API_BASE_URL,
    manage: process.env.MANAGE_API_BASE_URL, 
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

const port = process.env.APIGATEWAY_PORT;


app.listen(port, () => console.log(`server running on http://localhost:${port}`));
