import jwt from "jsonwebtoken";
import z from "zod";

import { Request, Response } from "express";
import { AppError } from "../../../errors/AppError";

import { LoginUseCase, UserLoginData } from "./LoginUseCase";

import { RequestBody } from "../../../utils/RequestBody";
import { SECRET } from "../../../utils/secret";

export class LoginController {
	async handle(req: RequestBody<UserLoginData>, res: Response) {
		console.log("Fazendo login");

		const bodySchema = z.object({
			email: z.string().email(),
			password: z.string(),
		});

		const { email, password } = bodySchema.parse(req.body);

		const loginUseCase = new LoginUseCase();
		const user = await loginUseCase.execute({ email, password });

		if (!user) {
			throw new AppError("invalid_credentials", 401);
		} else {
			const token = jwt.sign(
				{ id: user.id },
				SECRET,
				{ expiresIn: 60 * 60 * 24 * 30 } // 1 mês
			);

			res.status(200).json({
				token,
				avatar: user.avatar,
				name: user.name,
				aboutMe: user.aboutMe,
				email,
			});
		}
	}
}
