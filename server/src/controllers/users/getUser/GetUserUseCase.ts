import { prisma } from "../../../prisma/client";

export class GetUserUseCase {
	async execute(id: string) {
		console.log(`Obtendo usuário com ID ${id}`);
		const response = await prisma.user.findUniqueOrThrow({
			where: {
				id,
			},
		});

		return response;
	}
}
