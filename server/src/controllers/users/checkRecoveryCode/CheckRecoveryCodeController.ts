import { Response } from "express";
import { CheckRecoveryCodeProps, CheckRecoveryCodeUseCase } from "./CheckRecoveryControllerUseCase";
import { RequestBody } from "../../../utils/RequestBody";
import { AppError } from "../../../errors/AppError";

import log from "../../../utils/log";

// TODO: Mudar depois para amarelo os erros do usuário
export class CheckRecoveryCodeController {
    async handle(req: RequestBody<CheckRecoveryCodeProps>, res: Response) {
        const email = req.body?.email?.trim();
        const code = req?.body?.code?.trim();

        if (!email || !code) {
            log("Rejeitada verificação de código: E-mail ou código não inserido(s)", { color: "fgYellow" });
            throw new AppError("empty_fields");
        }

        if (!email.includes("@")) {
            log("Rejeitada verificaão de código: E-mail inválido", { color: "fgYellow" });
            throw new AppError("invalid_email");
        }

        if (code.length !== 6) {
            log("Rejeitada verificação de código: Código inválido", { color: "fgYellow" });
            throw new AppError("invalid_code");
        }

        const checkRecoveryCodeUseCase = new CheckRecoveryCodeUseCase();
        const change_secret = await checkRecoveryCodeUseCase.execute({ email, code });

        if (change_secret) {
            res.status(200).json({
                code: "ok",
                changeSecret: change_secret
            });
        } else throw new AppError("internal_server_error", 500);
    }
}
