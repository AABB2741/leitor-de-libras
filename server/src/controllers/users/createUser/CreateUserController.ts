import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { RequestBody } from "../../../utils/RequestBody";

import { CreateUserUseCase, UserSignUpData } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: RequestBody<UserSignUpData>, res: Response) {
        // Pega as informações enviadas durante a requisição
        const { body } = req;

        const name = body?.name?.trim();
        const email = body?.email?.trim();
        const password = body?.password?.trim();

        // Se não houver um nome de usuário, um e-mail ou senha, a solicitação de cadastro será rejeitada com o código 400 (bad request)
        if (!name || !password || !email) {
            throw new AppError("empty_fields", 400);
        }

        // Faz a conexão com o arquivo responsável pela conexão com o banco (CreateUserUsecase)
        const createUserUsecase = new CreateUserUseCase();
        const user = await createUserUsecase.execute({ name, email, password });

        // Retorna as informações de avatar, nome e email do usuário para o frontend
        res.status(201).json({
            avatar: "", // TODO: definir depois o avatar
            name: user?.name,
            email: user?.email
        });
    }
}
