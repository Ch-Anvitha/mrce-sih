import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";

import { errorHandler, notFound } from "./middlewares/index.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Stricter Rate Limiting for Auth
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 20, // Limit each IP to 20 login requests per hour
  message: "Too many login attempts, please try again later.",
});
app.use("/api/v1/auth/login", authLimiter);

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, "http://localhost:5173"] 
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(compression());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;
