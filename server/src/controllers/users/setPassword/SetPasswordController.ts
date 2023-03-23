import { Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import { SetPasswordControllerUseCase, SetPasswordProps } from "./SetPasswordControllerUseCase";
import log from "../../../utils/log";

export class SetPasswordContoller {
    async handle(req: RequestBody<SetPasswordProps>, res: Response) {
        const password = req.body?.password?.trim();
        const change_secret = req.body?.change_secret;

        if (!password) {
            log("Erro ao alterar senha: Nova senha ou código não inserido(s)", { color: "fgYellow" });
            throw new AppError("empty_fields");
        }
        
        if (password.length < 8 || password.length > 32) {
            log("Erro ao alterar senha: Tamanho inválido de senha", { color: "fgYellow" });
            throw new AppError("invalid_password_length");
        }
        
        if (!change_secret) {
            log("Erro ao alterar senha: Código não recebido", { color: "fgYellow" });
            throw new AppError("secret_not_sent", 401);
        }

        const setPasswordControllerUseCase = new SetPasswordControllerUseCase();
        const response = await setPasswordControllerUseCase.execute({ password, change_secret });

        if (response) {
            res.json(200).json({
                code: "ok"
            });
        }
    }
}
