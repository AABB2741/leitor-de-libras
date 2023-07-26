import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";

import { z } from "zod";
import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";

import { DeleteTranslationUseCase } from "./DeleteTranslationUseCase";

const secret = process.env.JWT_SECRET as string;

export class DeleteTranslationController {
    async handle(req: RequestBody<{}>, res: Response) {
        const headerSchema = z.object({
            authorization: z.string()
        });
        const { authorization } = headerSchema.parse(req.headers);

        const token = jwt.verify(authorization, secret);

        if (!token) throw new AppError("invalid_token", 401);

        const paramsSchema = z.object({
            ids: z.string().array()
        });
        const { ids } = paramsSchema.parse(req.body);

        console.log(ids);
        const deleteTranslationUseCase = new DeleteTranslationUseCase();

        const response = await deleteTranslationUseCase.execute(ids);
        res.json(response);
    }
}
