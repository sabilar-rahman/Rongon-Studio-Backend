import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import mainRouter from "./routes";

import { notFound } from "./utils/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
// import { globalErrorHandler } from "./app/middleware/globalErrorHandler";



const app: Application = express();
app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "Rongon Server World"
    });
})

app.use("/api", mainRouter);

app.use(globalErrorHandler)

app.use(notFound);

export default app;
