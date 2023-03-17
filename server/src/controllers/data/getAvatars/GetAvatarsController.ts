import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { GetAvatarsUseCase } from "./GetAvatarsUseCase";

export class GetAvatarsController {
    // TODO: Pegar ID do usuário através do JWT
    async handle(req: Request, res: Response) {
        const getAvatarsUseCase = new GetAvatarsUseCase();
        const avatars = await getAvatarsUseCase.execute();

        if (!avatars) {
            throw new AppError("internal_server_error", 500);
        }
    }
}
