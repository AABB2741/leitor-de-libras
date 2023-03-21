import { Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import { RecoveryCodeProps } from "../requestRecoveryCode/RequestRecoveryCodeUseCase"
import log from "../../../utils/log";

export class DeleteRecoveryCodeController {
    async handle(req: RequestBody<RecoveryCodeProps>, res: Response) {
        const email = req.body?.email?.trim();

        if (!email) {
            log("Rejeitada exclusão de código: E-mail não inserido", { color: "fgRed" });
            throw new AppError("empty_fields", 400);
        }
    }
}
