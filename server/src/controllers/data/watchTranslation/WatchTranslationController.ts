import { Request, Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";

import { WatchTranslationUseCase } from "./WatchTranslationUseCase";

const secret = process.env.JWT_SECRET as string;

interface JwtPayload {
    id: string;
}

export class WatchTranslationController {
    async handle(req: RequestBody<{ id: string }>, res: Response) {
        const paramsSchema = z.object({
            authorization: z.string(),
            id: z.string().uuid()
        })

        const { authorization, id } = paramsSchema.parse(req.headers);

        const token = jwt.verify(authorization, secret) as (JwtPayload | null);
        if (!authorization || !token) throw new AppError("invalid_session", 401);

        const watchTranslationUseCase = new WatchTranslationUseCase();
        const file = await watchTranslationUseCase.execute({ id, userId: token.id });

        res.json({
            file
        });
    }
}
