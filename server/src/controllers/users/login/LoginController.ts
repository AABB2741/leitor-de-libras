import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";

import { LoginUseCase, UserLoginData } from "./LoginUseCase";

import { RequestBody } from "../../../utils/RequestBody";
import { SECRET } from "../../../utils/secret";

export class LoginController {
    async handle(req: RequestBody<UserLoginData>, res: Response) {
        console.log("Tentando fazer login")
        const email = req.body?.email?.trim();
        const password = req.body?.password?.trim();

        if (!email || !password)
            throw new AppError("empty_fields", 400);

        if (!email)
            throw new AppError("invalid_fields");

        const loginUseCase = new LoginUseCase();
        const user = await loginUseCase.execute({ email, password });

        if (!user) {
            throw new AppError("invalid_credentials", 401);
        } else {
            const token = jwt.sign(
                { id: user.id },
                SECRET,
                { expiresIn: 60 * 60 } // 1 hora
            );

            res.status(200).json({
                token,
                avatar: user.avatar,
                name: user.name,
                about_me: user.about_me,
                email
            });
        }
    }
}
