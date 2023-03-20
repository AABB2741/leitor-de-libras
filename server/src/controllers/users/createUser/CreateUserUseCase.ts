import CryptoJS from "crypto-js";

import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/AppError";

import log from "../../../utils/log";

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
            prisma.log.create({
                data: {
                    action_code: "user/create-try",
                    details: `Tentou cadastrar com e-mail "${email}" que já pertece a ${alreadyExists.name} (ID: ${alreadyExists.id})`
                }
            }).then(_ => {
                log(`Tentativa de cadastro com e-mail já existente: ${email}`, { color: "fgGray" });
            }).catch(e => {
                log("Erro ao registrar criação de usuário existente: " + e, { color: "fgRed" });
            });

            throw new AppError("email_already_in_use", 409);
        }

        // Se não houver, será cadastrado um novo usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: CryptoJS.SHA256(password).toString() // Criptografa a senha
            }
        });

        prisma.log.create({
            data: {
                action_code: "user/create",
                owner_id: user.id,
                details: `Criado usuário "${user.name}" com e-mail "${user.email}"`
            }
        }).then(_ => {
            log(`Cadastrado usuário ${user.name} com ID ${user.id}`, { color: "fgGray" });
        }).catch(e => {
            log(`Erro ao registrar criação de usuário: ${e}`, { color: "fgRed" });
        });

        log("Respondendo");
        return user;
    }
}
