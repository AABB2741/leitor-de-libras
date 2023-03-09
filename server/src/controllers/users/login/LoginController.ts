import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";

import { LoginUseCase, UserLoginData } from "./LoginUseCase";

import { RequestBody } from "../../../utils/RequestBody";
import { getLang } from "../../../lang/getLang";
import { SECRET } from "../../../utils/secret";

export class LoginController {
    async handle(req: RequestBody<UserLoginData>, res: Response) {
        const lang = getLang(req.body?.lang);

        const email = req.body?.email?.trim();
        const password = req.body?.password?.trim();

        if (!email || !password) {
            throw new AppError(lang.login.err.empty_fields, 400);
        }

        const loginUseCase = new LoginUseCase();
        const user = await loginUseCase.execute({ email, password });

        if (!user) {
            throw new AppError(lang.login.err.invalid_email_or_password);
        } else {
            const token = jwt.sign(
                { id: user.id },
                SECRET,
                { expiresIn: 60 * 60} // 1 hora
            );

            res.status(200).json({
                token,
                avatar: user.avatar,
                name: user.name,
                email
            });
        }
    }
}
