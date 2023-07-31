import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import z from "zod";

import { AppError } from "../../../errors/AppError";
import { UploadImageUseCase } from "./UploadImageUseCase";

const secret = process.env.JWT_SECRET as string;

type JwtPayload = {
	id: string;
};

export class UploadImageController {
	async handle(req: Request, res: Response) {
		if (!req.file) throw new AppError("invalid_media", 400);

		const headerSchema = z.object({
			authorization: z.string(),
		});

		const { authorization } = headerSchema.parse(req.headers);
		const token = jwt.verify(authorization, secret) as JwtPayload | null;

		if (!token) throw new AppError("invalid_token", 401);

		// Permite a sobreposição de informações
		const bodySchema = z.object({
			archived: z.boolean().optional(),
			createdAt: z.date().optional(),
			favorited: z.boolean().optional(),
			password: z.string().optional(),
			title: z.string().optional(),
			content: z.string().optional(),
		});

		console.log(JSON.stringify(req.body));
		const userData = bodySchema.parse(req.body);

		const uploadImageUseCase = new UploadImageUseCase();
		const response = await uploadImageUseCase.execute({
			...userData,
			authorId: token.id,
			imageName: req.file.filename,
		});

		res.json(response);
	}
}
