import { prisma } from "../../../prisma/client";
import CryptoJS from "crypto-js";

import { AppError } from "../../../errors/AppError";
import log from "../../../utils/log";

export interface SetPasswordProps {
    password: string;
    change_secret: string;
}

export class SetPasswordControllerUseCase {
    async execute({ password, change_secret }: SetPasswordProps) {
        const recoveryCode = await prisma.recoveryCode.findFirst({
            where: {
                change_secret,
                using: true,
                expires_in: {
                    gt: new Date()
                }
            }
        });

        if (!recoveryCode) {
            // 
            throw new AppError("invalid_secret", 401);
        }

        const user = await prisma.user.update({
            where: {
                email: recoveryCode.userEmail
            },
            data: {
                password: CryptoJS.SHA256(password).toString()
            }
        });

        await prisma.recoveryCode.update({
            where: {
                id: recoveryCode.id
            },
            data: {
                using: false
            }
        });

        prisma.log.create({
            data: {
                action_code: "user/change_password/ok",
                details: `A senha de ${user.name} foi alterada.`,
                ownerId: user.id
            }
        }).then(_ => {
            log("Alterada a senha de " + user.name, { color: "fgGray" });
        }).catch(e => {
            log("Não foi possível registrar a alteração de senha: " + e, { color: "fgRed" });
        });

        return true;
    }
}
