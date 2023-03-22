import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";
import { v4 as uuid } from "uuid";

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

        // TODO: Quando o código inserido for válido:
        // [ ] Gerar um UUID
        // [ ] Setar o código atual como desativado
        // [ ] Setar o change_secret como sendo esse ID
        // [ ] Setar o campo "using" do código para true
        // [ ] Enviar o código para o usuário

        const change_secret = uuid();
        const d = new Date();
        d.setMinutes(d.getMinutes() + 5);

        const changed = await prisma.recoveryCode.update({
            where: {
                id: exists.id
            },
            data: {
                active: false,
                using: true,
                change_secret,
                expires_in: d
            }
        });

        if (!changed) {
            prisma.log.create({
                data: {
                    action_code: "recovery_code/check/error",
                    details: `Tentativa de verificação de código com e-mail ${email} e código ${code}`
                }
            }).then(_ => {
                log("Rejeitada verificação de código: Erro interno", { color: "fgGray" });
            }).catch(e => {
                log("Não foi possível registrar falha na verificação de código: " + e, { color: "fgRed" });
            });
            throw new AppError("internal_server_error", 500);
        }

        prisma.log.create({
            data: {
                action_code: "recovery_code/check/ok",
                details: `Verificado código com ${email} e código ${code}. Foi gerado o código secreto de alteração "${change_secret}"`
            }
        }).then(_ => {
            log("Verificação de código confirmada", { color: "fgGray" });
        }).catch(e => {
            log("Não foi possível registrar confirmação na verificação de código: " + e, { color: "fgRed" });
        });

        return change_secret;
        // TODO: Na rota de troca de senha:
        // [ ] Verificar se existe algum código com esse change_secret e se está setado como true o campo "using"
        // [ ] Caso esteja, setar a nova senha e colocar como false o campo "using"
    }
}
