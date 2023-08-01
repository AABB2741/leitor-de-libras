import { Request, Response } from "express";

import z from "zod";
import jwt from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";
import { EditMultipleUseCase } from "./EditMultipleUseCase";

const secret = process.env.JWT_SECRET as string;

type JwtPayload = {
	id: string;
};

export class EditMultipleController {
	async handle(req: Request, res: Response) {
		const headersSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = headersSchema.parse(req.headers);

		const token = jwt.verify(authorization, secret) as JwtPayload;

		if (!token) throw new AppError("invalid_token", 401);

		const bodySchema = z.object({
			ids: z.string().array(),
			archived: z.boolean().optional(),
			favorited: z.boolean().optional(),
			password: z.string().optional(),
		});

		const { ids, ...data } = bodySchema.parse(req.body);

		const editMultipleUseCase = new EditMultipleUseCase();
		const response = await editMultipleUseCase.execute({
			...data,
			authorId: token.id,
			ids,
		});

		res.json(response);
	}
}
