import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental");
});

export default app;
