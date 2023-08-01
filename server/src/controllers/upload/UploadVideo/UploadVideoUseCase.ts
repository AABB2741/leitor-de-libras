import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import { prisma } from "../../../prisma/client";
import { MediaType } from "@prisma/client";

dayjs.locale(ptBr);

interface UploadVideoProps {
	authorId: string;
	imageName: string;
}

export class UploadVideoUseCase {
	async execute({ authorId, imageName }: UploadVideoProps) {
		let date = dayjs(new Date()).format("D[ de ]MMMM[, ]YYYY[ - ]hh[:]mm");

		const response = await prisma.translation.create({
			data: {
				authorId,
				imageName,
				title: `Captura de ${date}`,
				type: "v",
			},
		});

		return response;
	}
}
