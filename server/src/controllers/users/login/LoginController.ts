import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { getLang } from "../../../lang/getLang";
import { RequestBody } from "../../../utils/RequestBody";

import { UserLoginData } from "./LoginUseCase";

export class LoginController {
    async handle(req: RequestBody<UserLoginData>, res: Response) {
        const lang = getLang(req.body?.lang);

        const email = req.body?.email?.trim();
        const password = req.body?.password?.trim();

        if (!email || !password) {
            throw new AppError(lang.login.err.empty_fields, 400);
        }


    }
}
