import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";
import { AppError } from "./errors/AppError";

import log from "./utils/log";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            status: "error",
            code: err.code
        });
    }

    log("Ocorreu um erro: " + err, { color: "fgRed" });
    return res.status(500).json({
        status: "error",
        code: `internal_server_error`
    });
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});
