import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import { AppError } from "../../../errors/AppError";

import { RecoveryCodeProps, RequestRecoveryCodeUseCase } from "./RequestRecoveryCodeUseCase";

import log from "../../../utils/log";

export class RequestRecoveryCodeController {
    async handle(req: RequestBody<RecoveryCodeProps>, res: Response) {
        const email = req.body?.email?.toLowerCase()?.trim();
        console.log(email);

        if (!email) {
            log(`Criação de código rejeitada: E-mail não inserido`, { color: "fgRed" });
            throw new AppError("empty_fields", 400);
        }

        const requestRecoveryCodeUseCase = new RequestRecoveryCodeUseCase();
        const response = await requestRecoveryCodeUseCase.execute({ email });

        if (!response) {
            log("Criação de código rejeitada: Erro ao gerar código", { color: "fgRed" })
            throw new AppError("internal_server_error", 500);
        }

        log("Solicitado criação de código de recuperação. E-mail: " + email, { color: "fgGray" });
        res.status(201).send({
            status: "created",
            code: "ok"
        });
    }
}
