import { prisma } from "../../../prisma/client";

export class DeleteTranslationUseCase {
    async execute(ids: string[]) {
        const response = await prisma.translation.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                deleted: true
            }
        });

        return response;
    }
}
