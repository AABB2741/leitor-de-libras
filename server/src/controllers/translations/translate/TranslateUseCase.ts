import { Request } from "express";
import { ai } from "../../../lib/ai";
import { prisma } from "../../../prisma/client";

import { Translation } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

interface TranslateProps {
	authorId: string;
	id: string; // ID da tradução
	req: Request;
}

type TranslateResult = {
	result: string | null;
};

export class TranslateUseCase {
	async execute({
		authorId,
		id,
		req,
	}: TranslateProps): Promise<[Translation, TranslateResult]> {
		const { imageName, content, type } =
			await prisma.translation.findFirstOrThrow({
				where: {
					authorId,
					id,
					deleted: false,
					type: "i", // TODO: Quando pronto, fazer funcionar com vídeo tbm
				},
			});

		if (content) throw new AppError("denied", 406);

		const { protocol, hostname } = req;
		const url = `${protocol}://${hostname}:8000/uploads/${imageName}`;

		const res = await ai.post(
			"/translate",
			{
				url,
			},
			{
				timeout: 15000, // 15 segundos
			}
		);

		const updateResponse = await prisma.translation.update({
			where: {
				id,
			},
			data: {
				content: res.data.result,
			},
		});

		return [updateResponse, res.data]; // Retorna o objeto atualizado no banco e o resultado da tradução da IA
	}
}
