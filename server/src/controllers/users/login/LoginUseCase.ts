import CryptoJS from "crypto-js";

import { prisma } from "../../../prisma/client";

export type UserLoginData = {
    email: string;
    password: string;
}

export class LoginUseCase {
    async execute({ email, password }: UserLoginData) {
        const user = await prisma.user.findFirst({
            where: {
                email,
                password: CryptoJS.SHA256(password).toString()
            }
        });

        return user;
    }
}
