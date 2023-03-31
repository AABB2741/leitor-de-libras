import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { verify } from "../../../utils/jwtTools";

import { SECRET } from "../../../utils/secret";

export class PingController {
    async handle(req: Request, res: Response) {
        const token = req.headers["x-access-token"];
        console.log("Ping! " + token);

        if (typeof token !== "string")
            throw new AppError("invalid_token", 400);
        
        const [err, decoded] = await verify(token);

        if (err)
            throw new AppError("invalid_token");
        // FIXME: Ver pq o util SECRET n tá funcionando

        res.status(200).json({
            message: "Olá, mundo!",
            token
        });
    }
}
