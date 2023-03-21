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
        const exists = await prisma.recoveryCode.findFirst({
            where: {
                userEmail: email,
                active: true,
                expires_in: {
                    gte // gt -> maior que: pega somente os que possuírem data de expiração maior que a atual
                }
            }
        });

        if (exists) {
            log("Criação de código rejeitada: Código ativo já existe", { color: "fgRed" });
            throw new AppError("recovery_code_already_active", 403);
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            log("Criação de código rejeitada: Usuário não encontrado", { color: "fgRed" });
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

        return true;
    }
}
