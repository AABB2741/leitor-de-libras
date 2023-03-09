import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import { getLang } from "../../../lang/getLang";

import { CreateUserUseCase, UserSignUpData } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: RequestBody<UserSignUpData>, res: Response) {
        const { body } = req;

        const lang = getLang(body?.lang);
        const name = body?.name?.trim();
        const email = body?.email?.trim();
        const password = body?.password?.trim();

        if (!name || !password || !email) {
            throw new AppError(lang.signUp.err.empty_fields, 400);
        }

        const createUserUsecase = new CreateUserUseCase();
        const user = await createUserUsecase.execute({ name, email, password, userLang: req.body?.lang });

        res.status(201).json({
            avatar: "", // TODO: definir depois o avatar
            name: user?.name,
            email: user?.email
        });
    }
}
