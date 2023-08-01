import { prisma } from "../../../prisma/client";

interface EditMultipleProps {
	authorId: string;
	ids: string[];
	archived?: boolean;
	favorited?: boolean;
	password?: string;
}

export class EditMultipleUseCase {
	async execute({ authorId, ids, ...data }: EditMultipleProps) {
		const response = await prisma.translation.updateMany({
			where: {
				authorId,
				deleted: false,
				id: {
					in: ids,
				},
			},
			data,
		});

		return response;
	}
}
