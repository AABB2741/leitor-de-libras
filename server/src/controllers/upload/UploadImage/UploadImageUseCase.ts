import dayjs from "dayjs";

import { prisma } from "../../../prisma/client";
import { MediaType } from "@prisma/client";

interface UploadImageProps {
	authorId: string;
	imageName: string;
	archived?: boolean;
	createdAt?: Date;
	favorited?: boolean;
	password?: string;
	title?: string;
	content?: string;
}

export class UploadImageUseCase {
	async execute({ authorId, imageName, ...rest }: UploadImageProps) {
		let date = dayjs(new Date()).format("D[ de ]MMMM[, ]YYYY[ - ]hh[:]mm");

		let fallback = {
			authorId,
			title: `Captura de ${date}`,
			type: "i" as MediaType,
			imageName,
		};

		let data = {
			...fallback,
			...rest,
		};

		console.log("Dados do usuário:");
		console.log(rest);
		let response = await prisma.translation.create({
			data,
		});
		console.log("Resposta:");
		console.log(response);
		return response;
	}
}
