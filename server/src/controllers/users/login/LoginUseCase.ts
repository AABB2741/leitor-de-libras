import CryptoJS from "crypto-js";

import { prisma } from "../../../prisma/client";

import log from "../../../utils/log";

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

        if (user) {
            prisma.log.create({
                data: {
                    action_code: "user/login",
                    details: `Entrou em usuário com e-mail "${user.email}".`,
                    owner_id: user.id
                }
            }).then(_ => {
                log(`Login com usuário ${user.name} (ID: ${user.id})`, { color: "fgGray" });
            }).catch(e => {
                log("Ocorreu um erro ao registrar login de usuário: " + e, { color: "fgRed" });
            });
        } else {
            prisma.log.create({
                data: {
                    action_code: "user/login-try",
                    details: `Tentativa de login mal-sucedida. E-mail utilizado: ${email}`
                }
            }).then(_ => {
                log(`Tentativa de login. E-mail utilizado: ${email}`, { color: "fgGray" });
            }).catch(e => {
                log("Ocorreu um erro ao registrar login de usuário: " + e, { color: "fgRed" });
            });
        }

        return user;
    }
}
