import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { TranslateUseCase } from "./TranslateUseCase";
import { AppError } from "../../../errors/AppError";

const secret = process.env.JWT_SECRET as string;

type JwtPayload = {
	id: string;
};

export class TranslateController {
	async handle(req: Request, res: Response) {
		const headersSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = headersSchema.parse(req.headers);

		const token = jwt.verify(authorization, secret) as JwtPayload;

		if (!token) throw new AppError("invalid_token", 401);

		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(req.params);

		const translateUseCase = new TranslateUseCase();
		const [response, result] = await translateUseCase.execute({
			authorId: token.id,
			id,
			req,
		});
		res.json(response);
		return response;
	}
}
