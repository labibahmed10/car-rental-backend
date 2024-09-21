import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoutes from "./app/middleware/notFoundRoutes";
import apiUsage from "./app/config/apiUsage";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

//Application Routes
app.use("/api", router);

// use route
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send(apiUsage);
});

app.use(notFoundRoutes);

export default app;
