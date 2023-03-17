import { Avatar } from "@prisma/client";
import { prisma } from "../../../prisma/client";

import log from "../../../utils/log";

export class GetAvatarsUseCase {
    async execute(): Promise<Avatar[] | null> {
        try {
            const avatars = await prisma.avatar.findMany();

            prisma.log.create({
                data: {
                    action_code: "get/avatars",
                    details: "Obtida a lista de avatares"
                }
            }).then(() => {
                log("Obtida a lista de avatares", { color: "fgGray" });
            });

            return avatars;
        } catch (e) {
            log(`Erro ao obter lista de avatares: ${e}`);
            return null;
        }
    }
}
