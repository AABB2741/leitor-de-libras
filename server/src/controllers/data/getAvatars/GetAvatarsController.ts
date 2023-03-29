import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { GetAvatarsUseCase } from "./GetAvatarsUseCase";

import log from "../../../utils/log";

export class GetAvatarsController {
    // TODO: Pegar ID do usuário através do JWT
    async handle(req: Request, res: Response) {
        log("Solicitação de lista de avatares", { color: "fgGray" });

        const getAvatarsUseCase = new GetAvatarsUseCase();
        const avatars = await getAvatarsUseCase.execute();

        if (!avatars)
            throw new AppError("internal_server_error", 500);

        res.json({
            avatars: avatars.map(a => ({
                code: a.code,
                url: a.url
            }))
        });
    }
}
