import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";

import log from "../../../utils/log";

export interface CheckRecoveryCodeProps {
    email: string;
    code: string;
}

export class CheckRecoveryCodeUseCase {
    async execute({ email, code }: CheckRecoveryCodeProps) {
        const exists = await prisma.recoveryCode.findFirst({
            where: {
                userEmail: email,
                code,
                expires_in: {
                    gt: new Date()
                }
            }
        });

        if (!exists) {
            log("Rejeitada verificação de código: Código inválido", { color: "fgYellow" });

            prisma.log.create({
                data: {
                    action_code: "recovery_code/check/invalid_code",
                    details: `Tentativa de verificação de código com e-mail ${email} e código ${code}`
                }
            }).then(_ => {
                log("Rejeitada verificação de código: Código inválido", { color: "fgGray" });
            }).catch(e => {
                log("Não foi possível registrar falha na verificação de código: " + e, { color: "fgRed" });
            });

            throw new AppError("invalid_code", 403);
        }

        return true;
    }
}
