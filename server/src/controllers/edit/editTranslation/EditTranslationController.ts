import { Request, Response } from "express";

import z from "zod";
import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";
import { EditTranslationUseCase } from "./EditTranslationUseCase";

const secret = process.env.JWT_SECRET as string;

type JwtPayload = {
	id: string;
};

export class EditTranslationController {
	async handle(req: Request, res: Response) {
		const headerSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = headerSchema.parse(req.headers);

		const token = jwt.verify(authorization, secret) as JwtPayload | null;

		if (!token) throw new AppError("invalid_token", 401);

		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(req.params);

		const bodySchema = z.object({
			archived: z.boolean().optional(),
			favorited: z.boolean().optional(),
			password: z.string().optional(),
			title: z.string().optional(),
			content: z.string().optional(),
		});

		const data = bodySchema.parse(req.body);

		const editTranslationUseCase = new EditTranslationUseCase();
		const response = await editTranslationUseCase.execute({
			...data,
			authorId: token.id,
			id,
		});

		res.json(response);
	}
}
