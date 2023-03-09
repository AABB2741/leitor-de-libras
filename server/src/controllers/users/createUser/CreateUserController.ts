import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";

import { CreateUserUseCase, UserSignUpData } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: RequestBody<UserSignUpData>, res: Response) {
        const { body } = req;

        const name = body?.name?.trim();
        const email = body?.email?.trim();
        const password = body?.password?.trim();
        
        if (!name || !password || !email) {
            throw new AppError("Um ou mais campos obrigatórios estão vazios", 400);
        }

        const createUserUsecase = new CreateUserUseCase();
        const user = await createUserUsecase.execute({ name, email, password });

        res.json({
            avatar: "",
            name: user?.name,
            email: user?.email
        });
    }
}
