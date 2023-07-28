import dayjs from "dayjs";

import { prisma } from "../../../prisma/client";

interface UploadVideoProps {
	authorId: string;
	imageName: string;
}

export class UploadVideoUseCase {
	async execute({ authorId, imageName }: UploadVideoProps) {
		let date = dayjs(new Date()).format("D[ de ]MMMM[, ]YYYY[ - ]hh[:]mm");

		const response = await prisma.translation.create({
			data: {
				imageName,
				authorId,
				title: `Captura de ${date}`,
				type: "v",
			},
		});

		return response;
	}
}
