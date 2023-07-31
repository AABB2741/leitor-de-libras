import dayjs from "dayjs";

import { prisma } from "../../../prisma/client";
import { MediaType } from "@prisma/client";

interface UploadVideoProps {
	authorId: string;
	imageName: string;
	archived?: boolean;
	createdAt?: Date;
	favorited?: boolean;
	password?: string;
	title?: string;
	content?: string;
}

export class UploadVideoUseCase {
	async execute({ authorId, imageName, ...rest }: UploadVideoProps) {
		let date = dayjs(new Date()).format("D[ de ]MMMM[, ]YYYY[ - ]hh[:]mm");

		let fallback = {
			authorId,
			title: `Captura de ${date}`,
			type: "v" as MediaType,
			imageName,
		};

		let data = {
			...fallback,
			...rest,
		};

		const response = await prisma.translation.create({
			data,
		});

		return response;
	}
}
