import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import jwt from "jsonwebtoken";
import { SECRET } from "../../../utils/secret";

import { CreateUserUseCase, UserSignUpData } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: RequestBody<UserSignUpData>, res: Response) {
        // Pega as informações enviadas durante a requisição
        const { body } = req;

        const name = body?.name?.trim();
        const email = body?.email?.trim();
        const password = body?.password?.trim();

        // Se não houver um nome de usuário, um e-mail ou senha, a solicitação de cadastro será rejeitada com o código 400 (bad request)
        if (!name || !password || !email)
            throw new AppError("empty_fields", 400);

        if (!email.includes("@"))
            throw new AppError("invalid_fields");

        if (password.length < 8 || password.length > 32)
            throw new AppError("invalid_password_length");

        // Faz a conexão com o arquivo responsável pela conexão com o banco (CreateUserUsecase)
        const createUserUseCase = new CreateUserUseCase();
        const user = await createUserUseCase.execute({ name, email, password });

        if (!user)
            throw new AppError("unknown_err", 500);

        const token = jwt.sign(
            { id: user?.id },
            SECRET,
            { expiresIn: 60 * 60 } // 1 hora
        );

        // Retorna as informações de avatar, nome e email do usuário para o frontend
        res.status(201).json({
            token,
            avatar: "", // TODO: definir depois o avatar
            name: user?.name,
            email: user?.email,
            about_me: user?.about_me
        });
    }
}
