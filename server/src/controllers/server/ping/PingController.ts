import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";

import { SECRET } from "../../../utils/secret";

export class PingController {
    handle(req: Request, res: Response) {
        const token = req.headers["x-access-token"];

        if (typeof token !== "string")
            throw new AppError("invalid_token", 400);

        // FIXME: Ver pq o util SECRET n tá funcionando
        const tokenResponse = jwt.verify(token, SECRET);

        res.status(200).json({
            message: "Olá, mundo!",
            token,
            tokenResponse
        });
    }
}
