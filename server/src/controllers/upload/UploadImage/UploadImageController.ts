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

		const uploadImageUseCase = new UploadImageUseCase();
		const response = await uploadImageUseCase.execute({
			authorId: token.id,
			imageName: req.file.filename,
		});

		res.status(201).json(response);
	}
}
