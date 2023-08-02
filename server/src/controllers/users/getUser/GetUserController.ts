import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { GetUserUseCase } from "./GetUserUseCase";
import { AppError } from "../../../errors/AppError";

const secret = process.env.JWT_SECRET as string;

type JwtPayload = {
	id: string;
};

export class GetUserController {
	async handle(req: Request, res: Response) {
		const headersSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = headersSchema.parse(req.headers);
		const token = jwt.verify(authorization, secret) as JwtPayload;

		if (!token) throw new AppError("invalid_token", 401);

		const getUserUseCase = new GetUserUseCase();
		const response = await getUserUseCase.execute(token.id);
		res.json(response);
	}
}
