// FIXME: Ver o porquê o prisma não estar criando o tipo User
import { v4 as uuid } from "uuid";
import { SHA256 } from "crypto-js";

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
        const alreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (alreadyExists) {
            throw new AppError("E-mail em uso por outro usuário");
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return user;
    }
}
