import { Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import { RecoveryCodeProps } from "../requestRecoveryCode/RequestRecoveryCodeUseCase"
import log from "../../../utils/log";
import { DeleteRecoveryCodeUseCase } from "./DeleteRecoveryCodeUseCase";

export class DeleteRecoveryCodeController {
    async handle(req: RequestBody<RecoveryCodeProps>, res: Response) {
        const email = req.body?.email?.trim();

        if (!email) {
            log("Rejeitada exclusão de código: E-mail não inserido", { color: "fgRed" });
            throw new AppError("empty_fields", 400);
        }

        const deleteRecoveryCodeUseCase = new DeleteRecoveryCodeUseCase();
        const response = await deleteRecoveryCodeUseCase.execute({ email });

        res.status(200).json({
            code: "ok",
            status: "deleted"
        });
    }
}
