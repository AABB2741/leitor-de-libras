import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";

import jwt from "jsonwebtoken";
import z from "zod";

import { GetTranslationsUseCase } from "./GetTranslationsUseCase";
import { AppError } from "../../../errors/AppError";

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

		const getTranslationUseCase = new GetTranslationsUseCase();
		const response = await getTranslationUseCase.execute({
			authorId: token.id,
		});

		res.json(response);
	}
}
