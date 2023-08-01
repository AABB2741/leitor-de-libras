import dayjs from "dayjs";

import { prisma } from "../../../prisma/client";
import { MediaType } from "@prisma/client";

interface UploadImageProps {
	authorId: string;
	imageName: string;
}

export class UploadImageUseCase {
	async execute({ authorId, imageName }: UploadImageProps) {
		let date = dayjs(new Date()).format("D[ de ]MMMM[, ]YYYY[ - ]hh[:]mm");

		let response = await prisma.translation.create({
			data: {
				authorId,
				imageName,
				title: `Captura de ${date}`,
				type: "i",
			},
		});

		return response;
	}
}
