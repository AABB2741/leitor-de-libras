import { prisma } from "../../../prisma/client";

import { AppError } from "../../../errors/AppError";
import { RecoveryCodeProps } from "../requestRecoveryCode/RequestRecoveryCodeUseCase";
import log from "../../../utils/log";

export class DeleteRecoveryCodeUseCase {
    async execute({ email }: RecoveryCodeProps): Promise<boolean> {
        const code = await prisma.recoveryCode.findFirst({
            where: {
                active: true,
                userEmail: email,
                expires_in: {
                    gt: new Date()
                }
            }
        });

        if (!code) {
            log("Rejeitada exclusão de código: Código não encontrado", { color: "fgGray" });
            prisma.log.create({
                data: {
                    action_code: "recovery_code/delete/recovery_code_not_found",
                    details: `Tentou excluir código vinculado a ${email}`
                }
            }).then(_ => {
                log("Rejeitada exclusão de código: Código não encontrado", { color: "fgGray" });
            }).catch(e => {
                log("Não foi possível registrar exclusão de código: " + e, { color: "fgRed" });
            });
            throw new AppError("recovery_code_not_found", 404);
        }

        await prisma.recoveryCode.update({
            where: {
                id: code.id,
            },
            data: {
                active: false,
                using: false
            }
        });

        prisma.log.create({
            data: {
                action_code: "recovery_code/delete/ok",
                details: `Desativado código ${code.code} para usuário com e-mail ${email}`
            }
        }).then(_ => {
            log("Código removido para e-mail " + email, { color: "fgGray" });
        }).catch(e => {
            log("Não foi possível registrar exclusão de código: " + e, { color: "fgRed" });
        });

        return true;
    }
}
