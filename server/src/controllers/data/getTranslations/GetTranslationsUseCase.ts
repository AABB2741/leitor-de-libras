import { prisma } from "../../../prisma/client";

interface GetTranslationsProps {
	authorId: string;
}

export class GetTranslationsUseCase {
	async execute({ authorId }: GetTranslationsProps) {
		const translations = await prisma.translation.findMany({
			where: {
				authorId,
				deleted: false,
			},
			orderBy: {
				createdAt: "desc",
			},
			select: {
				title: true,
				createdAt: true,
				imageName: true,
				id: true,
				type: true,
			},
		});

		return translations;
	}
}
