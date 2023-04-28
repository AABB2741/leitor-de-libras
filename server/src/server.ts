import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { router } from "./routes";
import { AppError } from "./errors/AppError";

import log from "./utils/log";

const app = express();
// express.static("/public")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log("Ocorreu um erro: " + err.stack, { color: "fgRed" });

    if (err instanceof AppError) {
        return res.status(err.status).json({
            status: "error",
            code: err.code
        });
    }

    return res.status(500).json({
        status: "error",
        code: `internal_server_error`
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Passando pelo middleware")
    next();
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});
