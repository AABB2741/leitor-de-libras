import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";

import * as JWT from "../../../utils/jwtTools";
import { AppError } from "../../../errors/AppError";
import { SECRET } from "../../../utils/secret";

import { UploadTranslationUseCase } from "./UploadTranslationUseCase";

export interface UploadTranslationData {
    title: string;
    password?: string;
}

export class UploadTranslationController {
    async handle(req: RequestBody<UploadTranslationData>, res: Response) {
        const token = req.headers["x-access-token"];

        if (!token || typeof token !== "string")
            throw new AppError("invalid_token");

        const [err, decoded] = await JWT.verify(token);

        if (err)
            throw new AppError("invalid_session");

        console.log(decoded);
        const uploadTranslationUseCase = new UploadTranslationUseCase();
    }
}
