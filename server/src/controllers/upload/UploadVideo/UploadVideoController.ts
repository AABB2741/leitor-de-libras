import { Request, Response } from "express";
import z from "zod";

import jwt from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";

import { UploadVideoUseCase } from "./UploadVideoUseCase";

const secret = process.env.JWT_SECRET as string;

type JwtPayload = {
	id: string;
};

export class UploadVideoController {
	async handle(req: Request, res: Response) {
		const headersSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = headersSchema.parse(req.headers);
		const token = jwt.verify(authorization, secret) as JwtPayload;

		if (!token) throw new AppError("invalid_token", 401);

		const uploadVideoUseCase = new UploadVideoUseCase();
		const data = await uploadVideoUseCase.execute({
			authorId: token.id,
			imageName: req.file?.filename as string,
		});

		res.status(201).json(data);
	}
}
