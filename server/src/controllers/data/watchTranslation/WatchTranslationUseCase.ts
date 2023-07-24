import { Translation } from "@prisma/client";
import { prisma } from "../../../prisma/client";

interface WatchTranslationProps {
    id: string;
    userId: string;
}

export class WatchTranslationUseCase {
    async execute({ id, userId }: WatchTranslationProps): Promise<Partial<Translation>> {
        const file = await prisma.translation.findFirstOrThrow({
            where: {
                id,
                authorId: userId,
                deleted: false
            }
        });

        return file;
    }
}
