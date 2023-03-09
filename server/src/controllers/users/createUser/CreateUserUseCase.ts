import CryptoJS from "crypto-js";

import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/AppError";

import { getLang, LangProps } from "../../../lang/getLang";

export type UserSignUpData = {
    name: string;
    email: string;
    password: string;
}

interface CreateUserUseCaseProps extends UserSignUpData {
    userLang?: Lang;
}

export class CreateUserUseCase {
    async execute({ name, email, password, userLang }: CreateUserUseCaseProps): Promise<User | null> {
        const lang = getLang(userLang);

        const alreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (alreadyExists) {
            throw new AppError("Email already in use");
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: CryptoJS.SHA256(password).toString()
            }
        });

        return user;
    }
}
