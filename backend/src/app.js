import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";

import { errorHandler, notFound } from "./middlewares/index.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(cors());

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
