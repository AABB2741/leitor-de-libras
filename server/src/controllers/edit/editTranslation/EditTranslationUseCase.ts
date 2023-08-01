import { prisma } from "../../../prisma/client";

interface EditTranslationProps {
	authorId: string; // ID do usuário
	id: string; // ID da tradução
	archived?: boolean;
	favorited?: boolean;
	password?: string;
	title?: string;
	content?: string;
}

export class EditTranslationUseCase {
	async execute({ id, authorId, ...data }: EditTranslationProps) {
		const response = await prisma.translation.update({
			// FIXME: Adicionar verificação se o solicitante é o dono da tradução
			where: {
				id,
			},
			data,
		});

		return response;
	}
}
