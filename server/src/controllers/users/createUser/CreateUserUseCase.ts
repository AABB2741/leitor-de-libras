import CryptoJS from "crypto-js";

import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/AppError";

export type UserSignUpData = {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    async execute({ name, email, password }: UserSignUpData): Promise<User | null> {
        // Verifica se já existe um usuário com este e-mail cadastrado
        const alreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (alreadyExists) { // Se houver, recusar a requisição
            throw new AppError("email_already_in_use");
        }

        // Se não houver, será cadastrado um novo usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: CryptoJS.SHA256(password).toString() // Criptografa a senha
            }
        });

        return user;
    }
}
