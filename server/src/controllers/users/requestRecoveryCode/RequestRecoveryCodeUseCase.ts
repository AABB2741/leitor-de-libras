import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";
import {  } from "@prisma/client";
import { censureEmail } from "../../../utils/censureEmail";

import { createCode } from "../../../utils/createCode";
import log from "../../../utils/log";

export interface RecoveryCodeProps {
    email: string;
}

export class RequestRecoveryCodeUseCase {
    // Checar primeiro se tem outro código de verificação ativo. Se houver, rejeitar solicitação
    async execute({ email }: RecoveryCodeProps): Promise<boolean> {
        const gte = new Date();
        console.log(gte);
        const alreadyExists = await prisma.recoveryCode.findFirst({
            where: {
                userEmail: email,
                expires_in: {
                    gte // gt -> maior que: pega somente os que possuírem data de expiração maior que a atual
                },
                OR: {
                    active: true,
                    using: true
                }
            }
        });

        if (alreadyExists) {
            log("Criação de código rejeitada: Código ativo já existe", { color: "fgRed" });
            prisma.log.create({
                data: {
                    action_code: "recovery_code/create/code_already_active",
                    details: `E-mail utilizado: ${email}`
                }
            }).then(_ => {
                log(`Rejeitada a criação de código, pois já existe um código ativo com este e-mail: ${email}`, { color: "fgGray" });
            }).catch(e => {
                log("Não foi possível registrar rejeição de código: " + e, { color: "fgRed" });
            });
            throw new AppError("recovery_code_already_active", 403);
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            log("Criação de código rejeitada: Usuário não encontrado", { color: "fgRed" });
            prisma.log.create({
                data: {
                    action_code: "recovery_code/create/user_not_found",
                    details: `E-mail utilizado: ${email}`
                }
            }).then(_ => {
                log("Rejeitada a criação de código pois não foi encontrado um usuário ativo com e-mail " + email);
            }).catch(e => {
                log("Não foi possível registrar rejeição de código: " + e, { color: "fgRed" });
            });
            throw new AppError("user_not_found", 404);
        }

        const code = createCode();
        const d = new Date();
        d.setHours(d.getHours() + 1); // adiciona uma hora

        const response = await prisma.recoveryCode.create({
            data: {
                userEmail: email,
                active: true,
                code,
                expires_in: d
            }
        });

        if (!response) {
            log("Criação de código rejeitada: Não houve resposta ao criar código", { color: "fgRed" });
            throw new AppError("internal_server_error", 500);
        }

        prisma.log.create({
            data: {
                action_code: "recovery_code/create/ok",
                details: `Criado código de recuperação ${code} com expiração em ${d.toString()}.`,
                ownerId: user.id
            }
        }).then(_ => {
            log(`Criado código de recuperação ${code} para ${user.name} (ID: ${user.id}) com e-mail ${email}. O código expira em ${d.toString()}`, { color: "fgGray" });
        }).catch(e => {
            log("Não foi possível registrar criação de código: " + e, { color: "fgRed" });
        });

        return true;
    }
}
