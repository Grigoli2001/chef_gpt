import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import logger, { stream } from "../middlewares/winston";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import SocketService from "../services/socket.service";
import http from "http";

// middleware
import notFound from "../middlewares/notFound";
import validator from "../middlewares/validator";
import healthCheck from "../middlewares/healthCheck";

// routes
import authRoutes from "../routes/auth.routes";
import gptRoutes from "../routes/gpt.routes";
import userPreferencesRoutes from "../routes/userPreferences.routes";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
      "http://localhost:3005",
      "http://localhost:3006",
    ],
    credentials: true,
  },
});

try {
  mongoose.connect(process.env.MONGO_URI as string);
  logger.info("MongoDB Connected");
} catch (error) {
  logger.error("Error connecting to DB" + error);
}

declare module "express-session" {
  export interface SessionData {
    user: {
      email?: string;
      _id?: string;
    };
  }
}

declare module "jsonwebtoken" {
  export interface UserJwtPayload {
    user: {
      email: string;
      id: string;
    };
  }
}
export const registerCoreMiddleWare = (): Application => {
  try {
    // using our session
    app.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
        },
      }),
    );

    app.use(morgan("combined", { stream }));
    app.use(express.json()); // returning middleware that only parses Json
    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:5173",
          "http://localhost:3001",
          "http://localhost:3002",
          "http://localhost:3003",
          "http://localhost:3004",
          "http://localhost:3005",
          "http://localhost:3006",
        ],
        credentials: true,
      }),
    );
    app.use(helmet()); // enabling helmet -> setting response headers
    app.use(cookieParser());

    // custom middleware
    app.use(validator);
    app.use(healthCheck);

    // routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userPreferencesRoutes);
    app.use("/api/gpt", gptRoutes);

    app.use(notFound);

    logger.http("Done registering all middlewares");
    return app;
  } catch (err) {
    logger.error(
      `Error thrown while executing registerCoreMiddleWare Error: ${err}`,
    );
    process.exit(1);
  }
};

// handling uncaught exceptions
const handleError = (): void => {
  process.on("uncaughtException", (err) => {
    logger.error(`UNCAUGHT_EXCEPTION OCCURED : ${JSON.stringify(err.stack)}`);
  });
};

// start applicatoin
export const startApp = (): void => {
  try {
    // register core application level middleware
    SocketService.initialize(io);
    registerCoreMiddleWare();
    server.listen(PORT, () => {
      logger.info("Listening on 127.0.0.1:" + PORT);
    });

    // exit on uncaught exception
    handleError();
  } catch (err) {
    logger.error(
      `startup :: Error while booting the applicaiton ${JSON.stringify(
        err,
        undefined,
        2,
      )}`,
    );
    throw err;
  }
};
