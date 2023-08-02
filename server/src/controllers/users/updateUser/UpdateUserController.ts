import { Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";

import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { AppError } from "../../../errors/AppError";

const secret = process.env.JWT_SECRET as string;

interface JwtPayload {
	id: string;
}

export class UpdateUserController {
	async handle(req: Request, res: Response) {
		const headersSchema = z.object({
			authorization: z.string(),
		});
		const { authorization } = headersSchema.parse(req.headers);

		const token = jwt.verify(authorization, secret) as JwtPayload;

		if (!token) throw new AppError("invalid_token", 401);

		const bodySchema = z.object({
			name: z.string().optional(),
			aboutMe: z.string().optional(),
			avatar: z.string().optional(),
		});

		const data = bodySchema.parse(req.body);
		const updateUserUsecase = new UpdateUserUseCase();
		const response = await updateUserUsecase.execute({
			...data,
			id: token.id,
		});

		res.json(response);
	}
}
