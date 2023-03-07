import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            status: "error",
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Erro interno no servidor: ${err.message}`
    });
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
});
