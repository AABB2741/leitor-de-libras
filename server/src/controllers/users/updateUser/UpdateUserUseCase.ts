import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";

interface UpdateUserProps {
	id: string;
	name?: string;
	aboutMe?: string;
	avatar?: string;
}

export class UpdateUserUseCase {
	async execute({ id, ...data }: UpdateUserProps) {
		const response = await prisma.user.update({
			where: {
				id,
			},
			data,
		});

		return response;
	}
}
