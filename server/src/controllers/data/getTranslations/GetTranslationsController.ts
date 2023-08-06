import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";

import jwt from "jsonwebtoken";
import z from "zod";
import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";

const secret = process.env.JWT_SECRET as string;

interface JwtPayload {
	id: string;
}

export class GetTranslationsController {
	async handle(req: RequestBody<null>, res: Response) {
		const paramsSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = paramsSchema.parse(req.headers);

		const token = jwt.verify(authorization, secret) as JwtPayload | null;

		if (!token) throw new AppError("invalid_token");

		const authorId = token.id;

		const translations = await prisma.translation.findMany({
			where: {
				authorId,
				deleted: false,
			},
			orderBy: {
				createdAt: "desc",
			},
			select: {
				title: true,
				createdAt: true,
				imageName: true,
				id: true,
				type: true,
			},
		});

		res.json(translations);
	}
}
