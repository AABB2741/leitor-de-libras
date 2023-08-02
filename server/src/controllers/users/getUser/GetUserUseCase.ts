import { prisma } from "../../../prisma/client";

export class GetUserUseCase {
	async execute(id: string) {
		const response = await prisma.user.findUniqueOrThrow({
			where: {
				id,
			},
		});

		return response;
	}
}
